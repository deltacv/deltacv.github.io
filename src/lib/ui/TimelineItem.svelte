<script lang="ts">
    import type { Snippet } from "svelte";

    let { 
        title, 
        subtitle = "", 
        date = "", 
        startDate = "",
        endDate = "",
        icon = null,
        iconColor = "#8b949e",
        children
    }: {
        title: string;
        subtitle?: string;
        date?: string;
        startDate?: string;
        endDate?: string;
        icon?: any;
        iconColor?: string;
        children?: Snippet;
    } = $props();

    function parseDate(d: string): { date: Date, hasMonth: boolean } | null {
        if (!d) return null;
        if (d.toLowerCase() === 'present') return { date: new Date(), hasMonth: true };
        
        // YYYY-MM
        if (/^\d{4}-\d{2}$/.test(d)) {
            const [year, month] = d.split('-');
            return { date: new Date(parseInt(year), parseInt(month) - 1), hasMonth: true };
        }
        // YYYY
        if (/^\d{4}$/.test(d)) {
            return { date: new Date(parseInt(d), 0), hasMonth: false };
        }
        // Fallback
        const parsed = new Date(d);
        if (!isNaN(parsed.getTime())) {
            return { date: parsed, hasMonth: !/^\d{4}$/.test(d.trim()) };
        }
        return null;
    }

    function formatMonthYear(d: string): string {
        if (!d) return '';
        if (d.toLowerCase() === 'present') return 'Present';
        const parsed = parseDate(d);
        if (!parsed) return d;
        
        if (!parsed.hasMonth) {
            return parsed.date.getFullYear().toString();
        }
        return parsed.date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }

    function calculateDuration(start: string, end: string): string {
        const sParsed = parseDate(start);
        const eParsed = parseDate(end);
        if (!sParsed || !eParsed) return '';

        const s = sParsed.date;
        const e = eParsed.date;

        if (!sParsed.hasMonth || !eParsed.hasMonth) {
            let yrs = e.getFullYear() - s.getFullYear();
            if (yrs <= 0) return '';
            return `${yrs} yr${yrs !== 1 ? 's' : ''}`;
        }

        let months = (e.getFullYear() - s.getFullYear()) * 12;
        months -= s.getMonth();
        months += e.getMonth();
        
        // If start and end are the same month, we might want it to still say 1 month
        if (months === 0) {
            months = 1;
        }

        if (months < 0) return '';

        const yrs = Math.floor(months / 12);
        const mos = months % 12;

        let result = [];
        if (yrs > 0) result.push(`${yrs} yr${yrs !== 1 ? 's' : ''}`);
        if (mos > 0) result.push(`${mos} mo${mos !== 1 ? 's' : ''}`);
        
        return result.join(' ');
    }

    let displayDate = $derived.by(() => {
        if (startDate && endDate) {
            const formattedStart = formatMonthYear(startDate);
            const formattedEnd = formatMonthYear(endDate);
            const duration = calculateDuration(startDate, endDate);
            
            if (duration) {
                return `${formattedStart} - ${formattedEnd} · ${duration}`;
            }
            return `${formattedStart} - ${formattedEnd}`;
        }
        return date;
    });
</script>

<div class="relative pl-8 md:pl-10 group">
    <!-- Icon or Dot -->
    <div class="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-[#161b22] border border-[#30363d] flex items-center justify-center shadow-sm group-hover:border-[#58a6ff] transition-colors" style="color: {iconColor}">
        {#if icon}
            {@const Icon = icon}
            <Icon size={14} strokeWidth={2.5} />
        {:else}
            <div class="w-2.5 h-2.5 rounded-full bg-current"></div>
        {/if}
    </div>

    <!-- Content -->
    <div class="flex flex-col gap-2">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-1.5 md:gap-4">
            <h3 class="text-lg font-bold text-[#c9d1d9] tracking-tight">{title}</h3>
            {#if displayDate}
                <span class="text-xs font-mono text-[#8b949e] bg-[#21262d] px-2.5 py-1 rounded-md border border-[#30363d] w-fit font-semibold tracking-wide">{displayDate}</span>
            {/if}
        </div>
        {#if subtitle}
            <h4 class="text-sm font-medium text-[#8b949e] max-w-[18rem] md:max-w-[22rem] leading-snug text-balance">{subtitle}</h4>
        {/if}
        
        {#if children}
            <div class="text-[#8b949e] text-[0.95rem] leading-relaxed space-y-2 mt-1">
                {@render children()}
            </div>
        {/if}
    </div>
</div>
