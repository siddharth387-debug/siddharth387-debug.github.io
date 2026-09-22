import React, { useState, useEffect } from 'react';
import { GitBranch, GitCommit, Activity, ArrowUpRight } from 'lucide-react';
import { Github } from './Icons';
import { SpotlightCard } from './SpotlightCard';

export const GitHubTelemetry = () => {
  const [stats, setStats] = useState({
    repos: 4,
    latestCommit: 'fix: resolve AI assisted message sending with FormSubmit',
    latestRepo: 'siddharth387-debug.github.io',
    latestDate: 'Recently',
    loaded: true
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch('https://api.github.com/users/siddharth387-debug'),
          fetch('https://api.github.com/users/siddharth387-debug/events?per_page=5')
        ]);

        if (!userRes.ok || !eventsRes.ok) return;

        const userData = await userRes.json();
        const eventsData = await eventsRes.json();

        if (!isMounted) return;

        // Find latest PushEvent
        const pushEvent = Array.isArray(eventsData) 
          ? eventsData.find((e) => e.type === 'PushEvent') 
          : null;

        let commitMsg = 'Production deployment updates';
        let repoName = 'siddharth387-debug.github.io';
        let dateStr = 'Recently';

        if (pushEvent) {
          repoName = pushEvent.repo?.name?.split('/')[1] || repoName;
          const headCommit = pushEvent.payload?.commits?.[0];
          if (headCommit?.message) {
            commitMsg = headCommit.message.split('\n')[0];
          }
          if (pushEvent.created_at) {
            const diffHours = Math.round((Date.now() - new Date(pushEvent.created_at).getTime()) / (1000 * 60 * 60));
            dateStr = diffHours < 1 ? 'Just now' : diffHours < 24 ? `${diffHours}h ago` : `${Math.round(diffHours / 24)}d ago`;
          }
        }

        setStats({
          repos: userData.public_repos || 4,
          latestCommit: commitMsg,
          latestRepo: repoName,
          latestDate: dateStr,
          loaded: true
        });
      } catch {
        // Keep initial fallback stats on rate limit or offline
      }
    }

    fetchGitHubData();
    return () => { isMounted = false; };
  }, []);

  return (
    <SpotlightCard className="p-5 flex flex-col justify-between">
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#161b22] text-[#38bdf8] border border-[#222b38]">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#f0f6fc] flex items-center gap-1.5">
                <span>siddharth387-debug</span>
              </div>
              <div className="text-[10px] text-[#8b949e]">Live GitHub Activity</div>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Synced
          </span>
        </div>

        {/* Latest Commit Snippet */}
        <div className="p-3 rounded-lg bg-[#090d12] border border-[#222b38] space-y-1.5 font-mono">
          <div className="flex items-center justify-between text-[10px] text-[#8b949e]">
            <span className="flex items-center gap-1">
              <GitBranch className="w-3 h-3 text-[#38bdf8]" />
              <span className="text-[#c9d1d9] truncate max-w-[140px]">{stats.latestRepo}</span>
            </span>
            <span className="text-[#8b949e]">{stats.latestDate}</span>
          </div>

          <div className="text-xs text-[#f0f6fc] flex items-start gap-1.5 line-clamp-2">
            <GitCommit className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="font-sans text-[11px] leading-tight text-[#c9d1d9]">{stats.latestCommit}</span>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <div className="pt-3 mt-3 border-t border-[#222b38]/70 flex items-center justify-between text-xs font-mono">
        <span className="text-[11px] text-[#8b949e]">
          Public Repos: <strong className="text-[#f0f6fc]">{stats.repos}</strong>
        </span>
        <a
          href="https://github.com/siddharth387-debug"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#38bdf8] hover:underline flex items-center gap-1"
        >
          View Profile <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </SpotlightCard>
  );
};
