export interface RagDocumentChunk {
  id: string;
  sourceDoc: string;
  sourceType: 'PDF' | 'DOCX' | 'PPTX' | 'XLSX' | 'CSV' | 'HTML';
  section: string;
  content: string;
  vectorScore: number;
  graphEntityLinks: string[];
  finalRerankScore?: number;
}

export interface RagSimulationResult {
  query: string;
  retrievedChunks: RagDocumentChunk[];
  topAnswer: string;
  citations: { doc: string; section: string; confidence: number }[];
  latencyMs: number;
  graphEntitiesMatched: string[];
}

export const KNOWLEDGE_CORPUS: RagDocumentChunk[] = [
  {
    id: 'chunk-101',
    sourceDoc: 'ISO-10816-Industrial-Turbines.pdf',
    sourceType: 'PDF',
    section: 'Section 4.2: Vibration Velocity Thresholds',
    content: 'For Class I machines under continuous load, vibration velocity RMS must remain below 2.8 mm/s for Zone A (new commissioning) and below 4.5 mm/s for Zone B (unrestricted long-term operation). Exceeding 7.1 mm/s triggers mandatory inspection.',
    vectorScore: 0.94,
    graphEntityLinks: ['Turbine-Unit-4', 'Vibration-Sensor-Group', 'ISO-10816'],
  },
  {
    id: 'chunk-102',
    sourceDoc: 'Hydraulic-System-Safety-Manual.docx',
    sourceType: 'DOCX',
    section: 'Chapter 7: Emergency Isolation Protocols',
    content: 'In the event of line pressure variance exceeding ±15 bar within 200ms, emergency solenoid valve EV-402 initiates auto-dump sequence to primary reservoir within 65ms, disabling pump drive.',
    vectorScore: 0.91,
    graphEntityLinks: ['Solenoid-EV402', 'Hydraulic-Loop-A', 'Safety-Interlock'],
  },
  {
    id: 'chunk-103',
    sourceDoc: 'Plant-Maintenance-Telemetry.xlsx',
    sourceType: 'XLSX',
    section: 'Sheet: Q1-Predictive-Log',
    content: 'Bearing temperature monitoring on Drive Motor M-12 indicates mean operating range 68°C to 74°C. Threshold trip alarm calibrated at 85°C with dual thermocouple redundancy.',
    vectorScore: 0.88,
    graphEntityLinks: ['Motor-M12', 'Thermocouple-Array', 'Predictive-Maintenance'],
  },
  {
    id: 'chunk-104',
    sourceDoc: 'Robotics-Actuator-Calibration.csv',
    sourceType: 'CSV',
    section: 'Telemetry Row #482: STM32 CAN Telemetry',
    content: 'STM32 CAN-bus node 0x14 reports joint 3 optical encoder backlash is ±0.04 degrees. Dynamic torque feedback loop adjusts pulse width modulation at 1kHz cycle frequency.',
    vectorScore: 0.89,
    graphEntityLinks: ['STM32-Controller', 'Actuator-Joint3', 'CAN-Bus-0x14'],
  },
  {
    id: 'chunk-105',
    sourceDoc: 'Cattle-Biometrics-Dataset-Specs.html',
    sourceType: 'HTML',
    section: 'Section 2: MobileNetV2 Image Specifications',
    content: 'Field smartphone captures must maintain minimum 1080x720 resolution with bounding box coverage ratio >= 0.45. Transfer learned MobileNetV2 outputs top-1 breed confidence alongside crossbreed genetic percentage.',
    vectorScore: 0.93,
    graphEntityLinks: ['MobileNetV2', 'Breed-Classifier', 'Edge-Inference'],
  },
];

export const PRESET_QUERIES = [
  'What are the vibration velocity thresholds for industrial turbines under ISO-10816?',
  'What is the emergency shutdown response time for hydraulic solenoid valve EV-402?',
  'How does the STM32 controller calibrate joint optical encoders over CAN bus?',
  'What input image requirements does the cattle breed classification model need?',
];

/**
 * Decoupled hybrid RAG simulation logic combining vector match + graph traversal scoring.
 */
export function simulateHybridRagQuery(rawQuery: string): RagSimulationResult {
  const query = rawQuery.trim();
  const queryLower = query.toLowerCase();

  // Score each chunk using token similarity + synthetic vector weight
  const scoredChunks = KNOWLEDGE_CORPUS.map((chunk) => {
    const contentLower = (chunk.content + ' ' + chunk.section + ' ' + chunk.sourceDoc).toLowerCase();
    const queryTokens = queryLower.split(/\s+/).filter((t) => t.length > 2);
    
    let tokenMatches = 0;
    queryTokens.forEach((token) => {
      if (contentLower.includes(token)) {
        tokenMatches += 1;
      }
    });

    const tokenOverlapRatio = queryTokens.length > 0 ? tokenMatches / queryTokens.length : 0.5;
    // Hybrid score: 60% semantic token match + 40% base vector score
    const hybridScore = Number((tokenOverlapRatio * 0.6 + chunk.vectorScore * 0.4).toFixed(3));

    return {
      ...chunk,
      finalRerankScore: hybridScore,
    };
  });

  // Sort by final rerank score descending
  scoredChunks.sort((a, b) => (b.finalRerankScore ?? 0) - (a.finalRerankScore ?? 0));

  const topChunk = scoredChunks[0];
  const matchedEntities = Array.from(new Set(scoredChunks.slice(0, 2).flatMap((c) => c.graphEntityLinks)));

  // Generate grounded answer
  let answerText = `Based on verified documentation in [${topChunk.sourceDoc}] (${topChunk.section}):\n\n`;
  answerText += topChunk.content;
  answerText += `\n\nCross-referenced with graph entities: ${matchedEntities.join(', ')}. Audit trail hash: 0x${Math.random().toString(16).slice(2, 10)}.`;

  const citations = scoredChunks.slice(0, 2).map((c) => ({
    doc: c.sourceDoc,
    section: c.section,
    confidence: Math.round((c.finalRerankScore ?? 0.8) * 100),
  }));

  return {
    query,
    retrievedChunks: scoredChunks.slice(0, 3),
    topAnswer: answerText,
    citations,
    latencyMs: Math.floor(45 + Math.random() * 30),
    graphEntitiesMatched: matchedEntities,
  };
}
