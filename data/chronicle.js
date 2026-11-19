// Season chronicle, written by chronicle.py from the pick ledger and the site's commit history. Times are Central.
window.CYRUS_CHRONICLE = {
  "season": 2026,
  "start_week": 8,
  "generated": "Thu Nov 19, 8:50 AM CT",
  "label": "2026 Weeks 8-10",
  "weeks": [
    {
      "week": 7,
      "official": false,
      "status": "graded",
      "rb": {
        "logged": 8,
        "picks": 8,
        "wins": 4,
        "losses": 4,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.5,
        "expected_pct": 0.617125
      },
      "qb": {
        "logged": 15,
        "picks": 15,
        "wins": 7,
        "losses": 8,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.4666666666666667,
        "expected_pct": 0.5414
      },
      "runs": [
        {
          "logged": "Sun Oct 25, 9:48 AM CT",
          "day": "Sun",
          "published": "offline"
        }
      ]
    },
    {
      "week": 8,
      "official": true,
      "status": "graded",
      "rb": {
        "logged": 8,
        "picks": 8,
        "wins": 5,
        "losses": 3,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.625,
        "expected_pct": 0.61925
      },
      "qb": {
        "logged": 17,
        "picks": 17,
        "wins": 6,
        "losses": 11,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.35294117647058826,
        "expected_pct": 0.5500588235294118
      },
      "runs": [
        {
          "logged": "Wed Oct 28, 6:49 PM CT",
          "day": "Wed",
          "published": "offline"
        },
        {
          "logged": "Sun Nov 1, 9:30 AM CT",
          "day": "Sun",
          "published": "manual",
          "pushed": "Sun Nov 1, 9:30 AM CT",
          "commit": "9b120d6"
        }
      ]
    },
    {
      "week": 9,
      "official": true,
      "status": "graded",
      "rb": {
        "logged": 9,
        "picks": 9,
        "wins": 6,
        "losses": 3,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.6666666666666666,
        "expected_pct": 0.6328888888888888
      },
      "qb": {
        "logged": 23,
        "picks": 23,
        "wins": 9,
        "losses": 14,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.391304347826087,
        "expected_pct": 0.563304347826087
      },
      "runs": [
        {
          "logged": "Wed Nov 4, 6:51 PM CT",
          "day": "Wed",
          "published": "offline"
        },
        {
          "logged": "Fri Nov 6, 6:51 PM CT",
          "day": "Fri",
          "published": "offline"
        }
      ]
    },
    {
      "week": 10,
      "official": true,
      "status": "graded",
      "rb": {
        "logged": 10,
        "picks": 8,
        "wins": 5,
        "losses": 3,
        "voids": 2,
        "pending": 0,
        "win_pct": 0.625,
        "expected_pct": 0.62225
      },
      "qb": {
        "logged": 16,
        "picks": 16,
        "wins": 10,
        "losses": 6,
        "voids": 0,
        "pending": 0,
        "win_pct": 0.625,
        "expected_pct": 0.55425
      },
      "runs": [
        {
          "logged": "Wed Nov 11, 6:51 PM CT",
          "day": "Wed",
          "published": "offline"
        },
        {
          "logged": "Fri Nov 13, 6:49 PM CT",
          "day": "Fri",
          "published": "offline"
        },
        {
          "logged": "",
          "day": "Sun",
          "published": "manual",
          "pushed": "Sun Nov 15, 7:47 PM CT",
          "commit": "4ad97bf",
          "note": "Week 10 card: record through Week 9 plus Monday night (manual publish, Sun Nov 15)"
        }
      ]
    },
    {
      "week": 11,
      "official": true,
      "status": "in_play",
      "rb": {
        "logged": 10,
        "picks": 0,
        "wins": 0,
        "losses": 0,
        "voids": 0,
        "pending": 10,
        "win_pct": null,
        "expected_pct": null
      },
      "qb": {
        "logged": 15,
        "picks": 0,
        "wins": 0,
        "losses": 0,
        "voids": 0,
        "pending": 15,
        "win_pct": null,
        "expected_pct": null
      },
      "runs": [
        {
          "logged": "Wed Nov 18, 6:49 PM CT",
          "day": "Wed",
          "published": "auto",
          "pushed": "Wed Nov 18, 6:48 PM CT",
          "commit": "3fb4872"
        }
      ]
    }
  ],
  "totals": {
    "rb": {
      "logged": 37,
      "picks": 25,
      "wins": 16,
      "losses": 9,
      "voids": 2,
      "pending": 10,
      "win_pct": 0.64,
      "expected_pct": 0.62512
    },
    "qb": {
      "logged": 71,
      "picks": 56,
      "wins": 25,
      "losses": 31,
      "voids": 0,
      "pending": 15,
      "win_pct": 0.44642857142857145,
      "expected_pct": 0.5566964285714285
    }
  },
  "milestones": [
    {
      "date": "Oct 25, 2026",
      "text": "Week 7: first card produced by the pipeline, graded as a test before the public record."
    },
    {
      "date": "Oct 28, 2026",
      "text": "Week 8: the public record begins. Tier names changed from betting vocabulary (Best Bet / Bet / Lean) to Strong / Moderate / Slight."
    },
    {
      "date": "Nov 2026",
      "text": "The website became a Cloudflare Pages project connected to GitHub: a commit to data/latest.js is the deployment."
    },
    {
      "date": "Nov 18, 2026",
      "text": "Week 11: first clean end-to-end run. The scheduled job built the card, pushed it to GitHub (6:48 PM CT), the site deployed itself, and the ledger was saved to Drive (6:51 PM CT) with no hand on any step. The independent checker confirmed all three the next morning."
    }
  ]
};
