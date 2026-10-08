export type PublicationStatus = "accepted" | "under-review" | "ready-for-submission";

export interface PublicationLink {
  label: string;
  href: string;
}

export interface Publication {
  id: string;
  title: string;
  status: PublicationStatus;
  /** Short venue line shown under the title, e.g. "Accepted — IEEE CSDE 2026". */
  statusLine: string;
  /** 1–2 sentences: the research problem investigated. */
  problem: string;
  /** 1–2 sentences: approach / result summary for the card. */
  summary: string;
  researchAreas: string[];
  featured?: boolean;
  author?: string;
  venue?: string;
  venueDetail?: string;
  location?: string;
  date?: string;
  links?: PublicationLink[];
  relatedProjectId?: string;
  relatedProjectTitle?: string;
  detail?: {
    question?: string;
    methodology?: string[];
    findings?: string[];
    note?: string;
  };
}

export const STATUS_META: Record<PublicationStatus, { label: string; badge: string }> = {
  accepted: {
    label: "Accepted",
    badge: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
  },
  "under-review": {
    label: "Under Review",
    badge: "text-amber-300 bg-amber-500/10 border-amber-500/30",
  },
  "ready-for-submission": {
    label: "Ready for Submission",
    badge: "text-muted-foreground bg-foreground/[0.05] border-border",
  },
};

export const publications: Publication[] = [
  {
    id: "pension-prototype",
    title:
      "An Ethereum and IPFS Prototype for Bangladesh's Universal Pension Scheme: Design, Cost Analysis, and Feasibility Limits",
    status: "accepted",
    statusLine: "Accepted — IEEE CSDE 2026",
    featured: true,
    problem:
      "Bangladesh's Universal Pension Scheme routes administration through paper-based processes and physical verification, leaving contributors with no independent way to verify the records held about their contributions.",
    summary:
      "A working Ethereum and IPFS prototype covering registration through eligibility, contributions, disbursement, gratuity, and nominee claims — four Solidity contracts with regression tests, Slither analysis, Sepolia deployment, and gas/cost analysis.",
    researchAreas: ["Blockchain", "Ethereum", "Smart Contracts", "IPFS", "Security Analysis"],
    venue: "11th IEEE Asia-Pacific Conference on Computer Science and Data Engineering",
    venueDetail: "IEEE CSDE 2026",
    location: "Cox's Bazar, Bangladesh",
    date: "November 1–3, 2026",
    links: [{ label: "Conference Website", href: "https://www.ieee-csde.org/" }],
    relatedProjectId: "blockchain-pension",
    relatedProjectTitle: "Blockchain Pension Management System",
    detail: {
      question:
        "Can Ethereum and IPFS provide a technically useful architecture for the scheme — and what are the practical economic and security limitations?",
      methodology: [
        "Prototype built around the structural features of the pension lifecycle: registration, eligibility, contributions, disbursement, gratuity, nominee survivor claims.",
        "Four Solidity smart contracts with automated regression testing.",
        "Slither static analysis plus manual security review; findings triaged and remediated.",
        "Deployed and evaluated on Ethereum Sepolia with gas/cost measurement.",
      ],
      findings: [
        "At the evaluated 20 Gwei assumption, a single monthly contribution cost approximately USD 13 in gas — around 2.9× the BDT 500 minimum contribution being recorded.",
        "Public-mainnet deployment is therefore economically infeasible under the tested assumptions — the negative feasibility result is part of the contribution.",
        "Security review surfaced issues that were triaged and fixed before evaluation closed.",
      ],
      note: "Research prototype — not a production system, government deployment, or operational platform.",
    },
  },
  {
    id: "vit-pathology",
    title: "Evaluating ViTs for Stain Robustness and Calibration in Low-Resource Pathology",
    status: "under-review",
    statusLine: "Under Review",
    problem:
      "Histopathology models can score strongly in-domain yet remain vulnerable to staining and color variation, with miscalibrated probabilities — a reliability problem under distribution shift.",
    summary:
      "Evaluated CNN and ViT-B/16 backbones on PatchCamelyon (20,000 patches, five seeds) in a single-GPU Colab setup: ViT-B/16 degraded ~1.5% relative AUC under the tested perturbation versus 7.7–11.0% for the compared CNNs, with better-calibrated probabilities.",
    researchAreas: ["Computer Vision", "Vision Transformers", "Digital Pathology", "Calibration", "Machine Learning"],
    detail: {
      question:
        "How do CNN and Vision Transformer backbones compare on stain robustness and calibration under a deliberately constrained, reproducible low-resource protocol?",
      methodology: [
        "PatchCamelyon with 20,000 training patches and five random seeds.",
        "ImageNet-pretrained CNN backbones compared against ViT-B/16.",
        "Single-GPU Google Colab environment — matched compute for every backbone.",
        "Stain/color-shift perturbation plus calibration analysis.",
      ],
      findings: [
        "ViT-B/16 showed a much smaller degradation (~1.5% relative AUC) than the compared CNN backbones (7.7–11.0%) under the specified perturbation.",
        "ViT-B/16 produced better-calibrated probabilities in the matched setting.",
      ],
      note: "An architecture-scale association under a controlled protocol — not a universal superiority claim, clinical validation, or deployed medical AI.",
    },
  },
  {
    id: "tta-reliability",
    title:
      "Calibrated Uncertainty for Assessing Reliability in Test-Time Adaptation of Vision Transformers Under Domain Shift",
    status: "ready-for-submission",
    statusLine: "Ready for Submission",
    problem:
      "Test-time adaptation can improve average accuracy under domain shift while silently converting previously correct predictions into incorrect ones — aggregate metrics hide prediction-level harm.",
    summary:
      "Studied TENT adaptation of ViT-B/16 on Camelyon17-WILDS: on the full target set accuracy moved 0.9490 → 0.9515 (288 corrected, 75 harmed, net +213), with confidence and predictive entropy strongly separating correct from incorrect predictions.",
    researchAreas: ["Test-Time Adaptation", "Vision Transformers", "Uncertainty Quantification", "Calibration"],
    detail: {
      question:
        "Can predictive uncertainty and calibration help assess the prediction-level reliability risk of test-time adaptation under domain shift?",
      methodology: [
        "Supervised ViT-B/16 on Camelyon17-WILDS under a center-disjoint protocol.",
        "TENT entropy-minimizing adaptation across four target-data budgets with multiple target subset seeds.",
        "Frozen No-TTA baseline and parameter-free Flip-TTA comparison.",
        "Calibration metrics, predictive uncertainty, and paired help-vs-harm analysis.",
      ],
      findings: [
        "TENT discrimination stayed relatively stable across target budgets; full-set accuracy 0.9490 (No-TTA) → 0.9515 (TENT).",
        "Paired analysis: 288 predictions corrected, 75 harmed — net improvement of 213.",
        "Confidence and predictive entropy strongly separated correct and incorrect predictions.",
      ],
      note: "Demonstrates the reliability signal; controller/gating designs are reserved for future work — not a deployed clinical system.",
    },
  },
  {
    id: "courier-blockchain",
    title: "Leveraging Blockchain Technology for Secure and Efficient Logistics in the Courier Industry",
    status: "ready-for-submission",
    statusLine: "Ready for Submission",
    author: "Abir Hasan",
    problem:
      "Courier operations depend on timely, trustworthy shipment information, but centralized records and manual verification leave it hard to audit, delayed, inconsistent, and open to disputes over loss, delays, payments, and delivery status.",
    summary:
      "A blockchain-based courier chain system — Ethereum-compatible smart contracts with a React dApp and MetaMask — covering package creation, ownership verification, tracking, status updates, and transparent record retrieval, evaluated in a local test environment.",
    researchAreas: ["Blockchain", "Ethereum", "Smart Contracts", "Distributed Systems"],
    detail: {
      question:
        "Can smart-contract shipment records with decentralized verification reduce the audit and dispute weaknesses of centralized courier tracking?",
      methodology: [
        "Ethereum-compatible smart contracts developed and tested against Ganache.",
        "React decentralized application with MetaMask for identity and signing.",
        "Package creation, ownership verification, tracking, status updates, transparent retrieval.",
        "Evaluation in a local test environment: creation time, success rate, gas-use optimization.",
      ],
      note: "Local test-environment results — not a production deployment or courier-company adoption.",
    },
  },
  {
    id: "airline-ticketing",
    title: "A Practical Blockchain Framework for Secure and Transparent Airline Ticketing",
    status: "ready-for-submission",
    statusLine: "Ready for Submission",
    problem:
      "Ticketing spans payments, reservations, airline databases, and customer service — when these systems disagree, travelers face failed issuance, slow refunds, and unclear ownership records.",
    summary:
      "A framework combining Ethereum contracts, NFT tickets, IPFS with on-chain hashes, decentralized identity, and ERC-2981 royalties across issuance, transfer, cancellation, refund, and resale — 110 contract tests passing with no high- or medium-severity static-analysis findings.",
    researchAreas: ["Blockchain", "Ethereum", "Smart Contracts", "IPFS", "Distributed Systems"],
    detail: {
      question:
        "Can an NFT-based ticket lifecycle with on-chain hashes and decentralized identity make issuance, ownership, and refunds auditable without trusting a single intermediary?",
      methodology: [
        "Ethereum smart contracts with NFT-based ticket representation and ERC-2981 resale royalties.",
        "IPFS storage with on-chain hashes; decentralized identity, elliptic-curve cryptography, zero-knowledge proofs.",
        "Full lifecycle: issuance, transfer, cancellation, refund, resale with airline/seller payment splitting.",
        "Measured confirmation latency, burst throughput, and gas cost per operation on a local network.",
      ],
      findings: [
        "110 contract tests passing; static analysis reported no high- or medium-severity findings.",
        "Resale proceeds split on-chain between airline royalty and seller.",
      ],
      note: "Prototype and local-network results — not an airline deployment, partnership, or commercial adoption.",
    },
  },
];

export const featuredPublication = publications.find((p) => p.featured) ?? publications[0];
export const manuscriptPublications = publications.filter((p) => !p.featured);
