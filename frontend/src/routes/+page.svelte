<script>
  import Button from '$lib/components/ui/button/button.svelte'

  let count = $state(1)
</script>

<Button onclick={() => count++}>Hello {count}</Button>
