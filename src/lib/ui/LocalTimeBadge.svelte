<script lang="ts">
    import InfoBadge from "./InfoBadge.svelte";
    import { Clock } from "lucide-svelte";

    let {
        timeZone,
        title = "Local Time",
        suffix = " Local",
        color = ""
    } = $props<{
        timeZone: string;
        title?: string;
        suffix?: string;
        color?: string;
    }>();

    let time = $state(new Date());
    let formattedTime = $derived(
        time.toLocaleTimeString("en-US", {
            timeZone,
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }) + suffix
    );

    $effect(() => {
        const interval = setInterval(() => {
            time = new Date();
        }, 1000);
        return () => clearInterval(interval);
    });
</script>

<InfoBadge {title} {color}>
    <Clock size={18} strokeWidth={2} />
    <span>{formattedTime}</span>
</InfoBadge>
