<!-- Bubble item text -->
<script lang="ts">
    import type Bubble from '../../Models/Bubble'

    //--- parameters describing the bubble
    export let bubble: Bubble
</script>

<text
    x={bubble.text.x}
    y={bubble.text.y}
    fill="#34495e"
    style={bubble.text.style}
>
    {bubble.text.value}
</text>
