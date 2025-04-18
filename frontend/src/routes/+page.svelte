<script>
  import Button from '$lib/components/ui/button/button.svelte'

  let count = $state(1)
</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the
  documentation
</p>

<Button onclick={() => count++}>Hello {count}</Button>
