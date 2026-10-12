import { PROJECTS } from '../constants';

/**
 * cases.js — Task 2 rail card data. Card copy is pinned verbatim by the
 * redesign brief; no URLs live here.
 *
 * DudhWala privacy is data-driven from the frozen constants (never hardcoded):
 * PROJECTS carries github: null for it, so we match via !project.github and
 * render the `Private · Live` chip with zero anchors on the card.
 */
const dudhwala = PROJECTS.find((p) => p.title === 'DudhWala');
const dudhwalaPrivate = !dudhwala?.github;

export const CASES = {
  fisherman: {
    slug: 'fisherman',
    visual: 'GO / CAUTION / NO-GO — Kerala coast',
    chips: ['AI agent · 2026', '9-node LangGraph'],
    title: 'Fisherman Safety Agent',
    blurb: 'Live ocean data, ranked fishing zones, Malayalam voice advisories.',
  },
  dudhwala: {
    slug: 'dudhwala',
    visual: 'Dairy delivery, live in production',
    chips: dudhwalaPrivate
      ? ['Production app', 'Private repo', 'Private · Live']
      : ['Production app', 'Private repo'],
    title: 'DudhWala',
    blurb: 'Shops, drivers, GPS-tagged deliveries, payments and PDF reports.',
  },
  coderag: {
    slug: 'coderag',
    visual: 'Ask any codebase anything',
    chips: ['RAG · 2025', 'ChromaDB + rerank'],
    title: 'CodeRAG',
    blurb: 'Multi-repo code Q&A with AST chunking and hybrid search.',
  },
  salespilot: {
    slug: 'salespilot',
    visual: 'Leads in, outreach out',
    chips: ['Agent · 2025', 'LangGraph + Postgres'],
    title: 'SalesPilot AI',
    blurb: 'Lead analysis and reviewed outreach over FastAPI and Docker.',
  },
  fakereview: {
    slug: 'fakereview',
    visual: 'Fake or original?',
    chips: ['ML · 2025', '86.7% accuracy'],
    title: 'Fake Review Detector',
    blurb: 'Logistic-regression classifier served over FastAPI.',
  },
  bingetime: {
    slug: 'bingetime',
    visual: 'Your private TV Time',
    chips: ['Mobile app', 'Expo + Supabase'],
    title: 'BingeTime',
    blurb: 'Show and movie tracker with TMDb, themes and offline-first lists.',
  },
};

// Rail groupings (verbatim from the brief).
export const FEATURED = ['fisherman', 'dudhwala', 'coderag'];
export const MORE = ['salespilot', 'fakereview', 'bingetime'];
