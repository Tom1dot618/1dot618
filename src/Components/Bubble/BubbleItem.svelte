<!-- Bubble item -->
<script lang="ts">
    import type Bubble from '../../Models/Bubble'

    //--- parameters describing the bubble
    export let bubble: Bubble

    function showVolume(event) {
        event.target.setAttribute('fill', '#ffffff')
    }

    function reset(event) {
        event.target.setAttribute('fill', '#000000')
    }
</script>

<circle
    on:mouseenter={showVolume}
    on:mouseleave={reset}
    cx={bubble.x}
    cy={bubble.y$}
    r={bubble.radius}
    fill={bubble.fillColor}
/>
