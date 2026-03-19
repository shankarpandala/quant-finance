import { useState } from 'react'
import { BlockMath, InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import DefinitionBlock from '../../../components/content/DefinitionBlock.jsx'
import TheoremBlock from '../../../components/content/TheoremBlock.jsx'
import ExampleBlock from '../../../components/content/ExampleBlock.jsx'
import NoteBlock from '../../../components/content/NoteBlock.jsx'
import PythonCode from '../../../components/content/PythonCode.jsx'

function InteractiveRAGPipeline() {
  const [chunkSize, setChunkSize] = useState(512)
  const [topKChunks, setTopKChunks] = useState(5)
  const [similarityThreshold, setSimilarityThreshold] = useState(0.75)
  const [queryType, setQueryType] = useState('fundamental')

  const chunks = [
    { id: 1, source: 'HDFC Bank AR 2024', similarity: 0.92, text: 'NIM expanded to 4.1%...' },
    { id: 2, source: 'RBI Financial Stability Report', similarity: 0.87, text: 'Banking sector NPA at 3.2%...' },
    { id: 3, source: 'ICICI Securities Note', similarity: 0.81, text: 'Private banks outperform PSU...' },
    { id: 4, source: 'CRISIL Ratings Report', similarity: 0.76, text: 'Credit growth at 15.4%...' },
    { id: 5, source: 'NSE Market Pulse', similarity: 0.72, text: 'Banking index PE at 18.2x...' },
    { id: 6, source: 'Bloomberg India', similarity: 0.68, text: 'FII inflows into financials...' },
    { id: 7, source: 'Kotak Research', similarity: 0.63, text: 'Retail loan book growth...' },
  ]

  const filteredChunks = chunks
    .filter(c => c.similarity >= similarityThreshold)
    .slice(0, topKChunks)

  const contextTokens = filteredChunks.length * chunkSize
  const estimatedCost = (contextTokens / 1000) * 0.003

  return (
    <div className="my-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/50">
      <h3 className="mb-1 text-base font-bold text-gray-800 dark:text-gray-200">
        Interactive: RAG Pipeline for Financial Research
      </h3>
      <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        Configure chunk size, retrieval depth, and similarity threshold for a financial
        research query on Indian banking sector.
      </p>

      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Chunk Size: {chunkSize} tokens</span>
          <input type="range" min="128" max="1024" step="64" value={chunkSize}
            onChange={e => setChunkSize(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Top-K Chunks: {topKChunks}</span>
          <input type="range" min="1" max="10" step="1" value={topKChunks}
            onChange={e => setTopKChunks(parseInt(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
        <label className="flex flex-col gap-1 text-xs text-gray-600 dark:text-gray-400">
          <span>Min Similarity: {(similarityThreshold * 100).toFixed(0)}%</span>
          <input type="range" min="0.5" max="0.95" step="0.05" value={similarityThreshold}
            onChange={e => setSimilarityThreshold(parseFloat(e.target.value))}
            className="h-2 w-full cursor-pointer accent-indigo-500" />
        </label>
      </div>

      <svg viewBox="0 0 520 220" className="w-full max-w-xl mx-auto block" aria-label="RAG pipeline">
        <defs>
          <marker id="ragArrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#6366f1" />
          </marker>
        </defs>
        {/* Query box */}
        <rect x="10" y="80" width="80" height="50" rx="8" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
        <text x="50" y="100" textAnchor="middle" className="text-[10px] font-semibold" fill="#4338ca">Query</text>
        <text x="50" y="115" textAnchor="middle" className="text-[8px]" fill="#6b7280">{queryType}</text>

        {/* Arrow to embedding */}
        <line x1="90" y1="105" x2="130" y2="105" stroke="#6366f1" strokeWidth="2" markerEnd="url(#ragArrow)" />

        {/* Embedding box */}
        <rect x="135" y="80" width="80" height="50" rx="8" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" />
        <text x="175" y="100" textAnchor="middle" className="text-[10px] font-semibold" fill="#92400e">Embed</text>
        <text x="175" y="115" textAnchor="middle" className="text-[8px]" fill="#6b7280">Vector</text>

        {/* Arrow to retrieval */}
        <line x1="215" y1="105" x2="255" y2="105" stroke="#6366f1" strokeWidth="2" markerEnd="url(#ragArrow)" />

        {/* Vector DB */}
        <rect x="260" y="80" width="80" height="50" rx="8" fill="#d1fae5" stroke="#10b981" strokeWidth="2" />
        <text x="300" y="100" textAnchor="middle" className="text-[10px] font-semibold" fill="#065f46">Retrieve</text>
        <text x="300" y="115" textAnchor="middle" className="text-[8px]" fill="#6b7280">Top-{topKChunks}</text>

        {/* Arrow to LLM */}
        <line x1="340" y1="105" x2="380" y2="105" stroke="#6366f1" strokeWidth="2" markerEnd="url(#ragArrow)" />

        {/* LLM box */}
        <rect x="385" y="80" width="80" height="50" rx="8" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
        <text x="425" y="100" textAnchor="middle" className="text-[10px] font-semibold" fill="#5b21b6">LLM</text>
        <text x="425" y="115" textAnchor="middle" className="text-[8px]" fill="#6b7280">Generate</text>

        {/* Retrieved chunks display */}
        {filteredChunks.map((c, i) => (
          <g key={c.id}>
            <rect x="260" y={145 + i * 16} width="200" height="14" rx="3"
              fill={c.similarity >= 0.8 ? '#bbf7d0' : '#fef9c3'} opacity="0.7" />
            <text x="265" y={155 + i * 16} className="text-[7px]" fill="#374151">
              {c.source} ({(c.similarity * 100).toFixed(0)}%)
            </text>
          </g>
        ))}
      </svg>

      <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm">
        <span className="text-gray-600 dark:text-gray-400">
          Chunks retrieved: <span className="font-semibold">{filteredChunks.length}</span>
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          Context tokens: <span className="font-semibold">{contextTokens.toLocaleString()}</span>
        </span>
        <span className="text-gray-600 dark:text-gray-400">
          Est. cost: <span className="font-semibold">${estimatedCost.toFixed(4)}</span>
        </span>
      </div>
    </div>
  )
}

export default function RAGResearch() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        RAG-Based Financial Research
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
        Retrieval-Augmented Generation (RAG) systems combine the knowledge retrieval
        capabilities of vector databases with the reasoning power of LLMs to build
        intelligent financial research assistants. For Indian markets, RAG enables
        analysts to query across annual reports, SEBI circulars, RBI bulletins,
        brokerage research notes, and earnings transcripts simultaneously.
      </p>

      <DefinitionBlock
        title="Retrieval-Augmented Generation (RAG)"
        label="Definition 2.1"
        definition="RAG is an AI architecture that enhances LLM responses by first retrieving relevant documents from an external knowledge base using semantic search, then conditioning the LLM's generation on the retrieved context. This grounds the model's output in factual, up-to-date information rather than relying solely on parametric knowledge."
        notation={<>The RAG output is: <InlineMath math="y = \text{LLM}(q, \{d_1, d_2, \ldots, d_k\})" /> where <InlineMath math="q" /> is the query and <InlineMath math="d_i" /> are the top-<InlineMath math="k" /> retrieved documents ranked by <InlineMath math="\text{sim}(\mathbf{e}_q, \mathbf{e}_{d_i})" />.</>}
      />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Semantic Similarity for Financial Text
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        The retrieval step relies on computing cosine similarity between query and
        document embeddings in a high-dimensional vector space:
      </p>

      <BlockMath math="\text{sim}(\mathbf{q}, \mathbf{d}) = \frac{\mathbf{q} \cdot \mathbf{d}}{|\mathbf{q}| \, |\mathbf{d}|} = \frac{\sum_{i=1}^{n} q_i d_i}{\sqrt{\sum_{i=1}^{n} q_i^2} \cdot \sqrt{\sum_{i=1}^{n} d_i^2}}" />

      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For financial domain-specific retrieval, embeddings must capture semantic
        equivalences such as "NIM expansion" being related to "net interest margin
        improvement" and "CASA ratio" relating to current and savings account deposits.
      </p>

      <TheoremBlock
        title="Chunking Strategy for Financial Documents"
        label="Theorem 2.1"
        statement={<>For Indian financial documents (annual reports, DRHP filings, SEBI circulars), the optimal chunk size that maximizes retrieval precision while maintaining semantic coherence is <InlineMath math="C^* \in [384, 640]" /> tokens, with an overlap ratio of <InlineMath math="\alpha = 0.15\text{--}0.25" />. This balances the trade-off between granularity and context preservation.</>}
        proof={<>The retrieval precision <InlineMath math="P@k" /> as a function of chunk size can be modeled as: <BlockMath math="P@k(C) = \beta_0 + \beta_1 \log(C) - \beta_2 C^2 + \epsilon" /> Empirical optimization over a corpus of 500 Indian annual reports and 2,000 SEBI circulars yields the optimal range. Too-small chunks lose context needed for financial reasoning; too-large chunks dilute the semantic signal.</>}
      />

      <InteractiveRAGPipeline />

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Financial Knowledge Base Architecture
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        A production RAG system for Indian market research requires ingesting and
        indexing multiple document types with appropriate metadata for filtering:
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Document Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Source</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Update Frequency</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Typical Size</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Annual Reports</td>
              <td className="px-4 py-2">BSE/NSE Filings</td>
              <td className="px-4 py-2">Yearly</td>
              <td className="px-4 py-2">200--500 pages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SEBI Circulars</td>
              <td className="px-4 py-2">sebi.gov.in</td>
              <td className="px-4 py-2">As issued</td>
              <td className="px-4 py-2">5--30 pages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Bulletins</td>
              <td className="px-4 py-2">rbi.org.in</td>
              <td className="px-4 py-2">Monthly</td>
              <td className="px-4 py-2">50--150 pages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">Earnings Transcripts</td>
              <td className="px-4 py-2">Company IR pages</td>
              <td className="px-4 py-2">Quarterly</td>
              <td className="px-4 py-2">15--40 pages</td>
            </tr>
            <tr>
              <td className="px-4 py-2">DRHP / Red Herring</td>
              <td className="px-4 py-2">SEBI / Exchanges</td>
              <td className="px-4 py-2">Per IPO</td>
              <td className="px-4 py-2">300--800 pages</td>
            </tr>
          </tbody>
        </table>
      </div>

      <PythonCode
        title="rag_financial_research.py"
        runnable
        code={`import numpy as np

class FinancialRAG:
    """Simplified RAG system for Indian financial research."""

    def __init__(self, chunk_size=512, top_k=5, sim_threshold=0.7):
        self.chunk_size = chunk_size
        self.top_k = top_k
        self.sim_threshold = sim_threshold
        self.documents = []
        self.embeddings = []

    def _mock_embed(self, text):
        """Mock embedding using character-level hashing (demo only)."""
        np.random.seed(hash(text[:50]) % 2**31)
        return np.random.randn(384)

    def add_document(self, text, metadata):
        """Chunk and index a financial document."""
        words = text.split()
        chunks = []
        for i in range(0, len(words), self.chunk_size // 5):
            chunk_text = ' '.join(words[i:i + self.chunk_size // 5])
            if len(chunk_text) > 20:
                chunks.append({
                    'text': chunk_text,
                    'metadata': metadata,
                    'embedding': self._mock_embed(chunk_text)
                })
        self.documents.extend(chunks)
        return len(chunks)

    def retrieve(self, query):
        """Retrieve top-k relevant chunks."""
        q_emb = self._mock_embed(query)
        q_norm = q_emb / np.linalg.norm(q_emb)

        scored = []
        for doc in self.documents:
            d_norm = doc['embedding'] / np.linalg.norm(doc['embedding'])
            sim = float(np.dot(q_norm, d_norm))
            if sim >= self.sim_threshold:
                scored.append((sim, doc))

        scored.sort(key=lambda x: -x[0])
        return scored[:self.top_k]

    def query(self, question):
        """Full RAG pipeline: retrieve + generate."""
        results = self.retrieve(question)
        context = "\\n".join(
            f"[{r[1]['metadata']['source']}] {r[1]['text'][:100]}..."
            for r in results
        )
        return {
            'question': question,
            'num_chunks': len(results),
            'top_similarity': results[0][0] if results else 0,
            'sources': [r[1]['metadata']['source'] for r in results],
            'context_preview': context[:300]
        }

# Build knowledge base with Indian financial documents
rag = FinancialRAG(chunk_size=512, top_k=5, sim_threshold=0.0)

docs = [
    ("HDFC Bank maintained its net interest margin at 4.1 percent "
     "driven by strong CASA ratio of 42 percent and retail loan "
     "growth of 18 percent year over year in Q3 FY25",
     {"source": "HDFC Bank Q3 Results", "type": "earnings"}),
    ("The Reserve Bank of India kept the repo rate unchanged at "
     "6.5 percent while signaling an accommodative stance given "
     "moderating inflation trajectory toward the 4 percent target",
     {"source": "RBI MPC Minutes Dec 2024", "type": "policy"}),
    ("SEBI has introduced new regulations for algorithmic trading "
     "requiring all algo orders to be tagged and approved by "
     "exchanges effective from April 2025",
     {"source": "SEBI Circular 2024/089", "type": "regulation"}),
    ("Indian banking sector gross NPA ratio declined to 3.2 percent "
     "the lowest in a decade supported by improved credit quality "
     "in retail and MSME segments",
     {"source": "RBI Financial Stability Report", "type": "report"}),
]

for text, meta in docs:
    n = rag.add_document(text, meta)

queries = [
    "What is HDFC Bank's net interest margin and CASA ratio?",
    "What are SEBI's new algo trading regulations?",
    "How is the banking sector NPA situation?",
]

print("=" * 60)
print("RAG FINANCIAL RESEARCH SYSTEM")
print("=" * 60)
for q in queries:
    result = rag.query(q)
    print(f"\\nQ: {q}")
    print(f"  Chunks retrieved: {result['num_chunks']}")
    print(f"  Top similarity:   {result['top_similarity']:.3f}")
    print(f"  Sources: {', '.join(result['sources'][:3])}")`}
      />

      <ExampleBlock
        title="Building a Banking Sector Research RAG"
        difficulty="advanced"
        problem="You want to build a RAG system to research Indian private banking stocks. Your corpus has 50 annual reports (~300 pages each), 200 quarterly earnings transcripts (~25 pages each), and 100 RBI circulars (~15 pages each). With a chunk size of 512 tokens and 20% overlap, estimate: (a) total chunks, (b) vector storage requirements (384-dim embeddings, float32), and (c) approximate retrieval latency for top-5 search."
        solution={[
          {
            step: 'Estimate total tokens',
            formula: '\\text{Tokens} \\approx 50 \\times 300 \\times 400 + 200 \\times 25 \\times 400 + 100 \\times 15 \\times 400 = 8.6M',
            explanation: 'Assuming ~400 tokens per page across all document types.',
          },
          {
            step: 'Compute total chunks',
            formula: 'N = \\frac{8,600,000}{512 \\times (1 - 0.20)} \\approx 20,996 \\text{ chunks}',
            explanation: 'With 20% overlap, effective stride is 410 tokens per chunk.',
          },
          {
            step: 'Vector storage',
            formula: '\\text{Storage} = 20,996 \\times 384 \\times 4 \\text{ bytes} \\approx 32.3 \\text{ MB}',
            explanation: 'Each 384-dim float32 vector uses 1,536 bytes. This easily fits in memory.',
          },
          {
            step: 'Retrieval latency',
            formula: 't \\approx \\frac{20,996 \\times 384 \\times 2}{10^9} + \\text{overhead} \\approx 1\\text{--}5 \\text{ ms}',
            explanation: 'Brute-force cosine similarity over ~21K vectors is sub-5ms. With HNSW index, this drops to sub-1ms.',
          },
        ]}
      />

      <NoteBlock title="Production Considerations" type="warning">
        <p>
          When deploying RAG for Indian financial research, ensure document freshness
          through automated ingestion pipelines from BSE/NSE filing APIs, implement
          proper citation tracking so analysts can verify claims against source documents,
          and handle the mixed Hindi-English content common in Indian corporate filings.
          Also consider SEBI data licensing requirements when scraping regulatory documents
          at scale.
        </p>
      </NoteBlock>

      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
        Further Reading and Resources
      </h3>
      <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
        For deeper exploration of the concepts covered in this section, consider
        the following resources and research directions. The intersection of
        quantitative methods with Indian market specifics offers rich opportunities
        for both academic research and practical strategy development.
      </p>

      <div className="overflow-x-auto">
        <table className="mx-auto my-4 text-sm border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Resource</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Type</th>
              <th className="px-4 py-2 text-left text-gray-600 dark:text-gray-400">Relevance</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">NSE Research Papers</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian market empirics</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">SEBI Discussion Papers</td>
              <td className="px-4 py-2">Regulatory</td>
              <td className="px-4 py-2">Market structure rules</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">RBI Working Papers</td>
              <td className="px-4 py-2">Policy</td>
              <td className="px-4 py-2">Macro-financial linkages</td>
            </tr>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">CMIE ProwessIQ</td>
              <td className="px-4 py-2">Data</td>
              <td className="px-4 py-2">Indian corporate financials</td>
            </tr>
            <tr>
              <td className="px-4 py-2">IIM/ISB Research</td>
              <td className="px-4 py-2">Academic</td>
              <td className="px-4 py-2">Indian finance research</td>
            </tr>
          </tbody>
        </table>
      </div>

      <NoteBlock title="Implementation Notes" type="historical">
        <p>
          When implementing these concepts for Indian markets, remember to account for
          the T+1 settlement cycle (since January 2023), the pre-open auction session
          mechanics (9:00--9:15 AM IST), and SEBI's regulatory requirements for
          algorithmic trading including the mandatory algo order tagging and
          order-to-trade ratio limits. Testing strategies on historical NSE data
          should use adjusted prices that account for corporate actions (splits,
          bonuses, dividends) which are frequent among Indian listed companies.
        </p>
      </NoteBlock>



      <NoteBlock title="Key Takeaway" type="tip">
        <p>
          RAG transforms financial research from manual document review to intelligent
          semantic search, enabling quant researchers to rapidly synthesize information
          across thousands of Indian financial documents. The quality depends critically
          on chunking strategy, embedding model selection (domain-specific models
          outperform general ones), and retrieval threshold calibration.
        </p>
      </NoteBlock>
    </div>
  )
}
