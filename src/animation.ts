import { animate, svg, stagger, utils } from "animejs";

type FlowConfig = {
  pathId: string;
  color: string;
  interval: number;
  duration: number;
  intervalJitter: number;
  durationJitter: number;
};

// Inbound: most active → quietest
const inboundSources: FlowConfig[] = [
  {
    pathId: "path-practice-management",
    color: "#0d9488",
    interval: 900,
    duration: 2400,
    intervalJitter: 400,
    durationJitter: 300,
  },
  {
    pathId: "path-payroll",
    color: "#0284c7",
    interval: 1300,
    duration: 2500,
    intervalJitter: 450,
    durationJitter: 320,
  },
  {
    pathId: "path-audit",
    color: "#0284c7",
    interval: 1600,
    duration: 2550,
    intervalJitter: 500,
    durationJitter: 330,
  },
  {
    pathId: "path-accounts-production",
    color: "#0284c7",
    interval: 1900,
    duration: 2600,
    intervalJitter: 550,
    durationJitter: 340,
  },
  {
    pathId: "path-hr",
    color: "#0d9488",
    interval: 2000,
    duration: 2650,
    intervalJitter: 600,
    durationJitter: 350,
  },
  {
    pathId: "path-it",
    color: "#0d9488",
    interval: 2400,
    duration: 2700,
    intervalJitter: 650,
    durationJitter: 360,
  },
  {
    pathId: "path-companies-house",
    color: "#7c3aed",
    interval: 2200,
    duration: 2750,
    intervalJitter: 650,
    durationJitter: 370,
  },
  {
    pathId: "path-charity-commission",
    color: "#7c3aed",
    interval: 3400,
    duration: 2850,
    intervalJitter: 850,
    durationJitter: 400,
  },
];

const outboundConsumers: FlowConfig[] = [
  {
    pathId: "path-out-automations",
    color: "#16a34a",
    interval: 1200,
    duration: 1800,
    intervalJitter: 400,
    durationJitter: 250,
  },
  {
    pathId: "path-out-bi",
    color: "#16a34a",
    interval: 1600,
    duration: 1900,
    intervalJitter: 450,
    durationJitter: 260,
  },
  {
    pathId: "path-out-ai",
    color: "#16a34a",
    interval: 2000,
    duration: 2000,
    intervalJitter: 500,
    durationJitter: 280,
  },
];

function jitteredDelay(base: number, spread: number): number {
  return Math.max(200, base + utils.random(-spread, spread));
}

function launchPacket(
  flow: FlowConfig,
  packetLayer: SVGGElement,
  motion: ReturnType<typeof svg.createMotionPath>,
): void {
  const packet = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  packet.setAttribute("r", "4");
  packet.setAttribute("fill", flow.color);
  packet.classList.add("data-packet");
  packetLayer.appendChild(packet);

  const duration = jitteredDelay(flow.duration, flow.durationJitter);

  animate(packet, {
    ...motion,
    ease: "linear",
    duration,
    onComplete: () => packet.remove(),
  });
}

function scheduleFlow(
  flow: FlowConfig,
  packetLayer: SVGGElement,
  motion: ReturnType<typeof svg.createMotionPath>,
): void {
  const scheduleNext = (): void => {
    const delay = jitteredDelay(flow.interval, flow.intervalJitter);
    window.setTimeout(() => {
      launchPacket(flow, packetLayer, motion);
      scheduleNext();
    }, delay);
  };

  scheduleNext();
}

function createFlows(flows: FlowConfig[], packetLayer: SVGGElement): void {
  flows.forEach((flow) => {
    const motion = svg.createMotionPath(`#${flow.pathId}`);
    const initialDelay = utils.random(0, flow.interval * 2.5);

    window.setTimeout(() => {
      scheduleFlow(flow, packetLayer, motion);
    }, initialDelay);
  });
}

function initDiagramAnimation(): void {
  const svgRoot = document.querySelector<SVGSVGElement>(".diagram-wrap svg");
  if (!svgRoot) return;

  const packetLayer = document.createElementNS("http://www.w3.org/2000/svg", "g");
  packetLayer.setAttribute("id", "packet-layer");
  svgRoot.appendChild(packetLayer);

  createFlows(inboundSources, packetLayer);
  createFlows(outboundConsumers, packetLayer);

  animate(".warehouse-layer", {
    opacity: [0.75, 1, 0.75],
    duration: 2800,
    delay: stagger(300),
    ease: "inOutSine",
    loop: true,
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDiagramAnimation);
} else {
  initDiagramAnimation();
}
