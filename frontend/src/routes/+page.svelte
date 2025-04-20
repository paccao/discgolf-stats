<script>
  import Button from '$lib/components/ui/button/button.svelte'
</script>

<main class="flex h-screen w-full flex-col p-4">
  <h1 class="w-full flex-1 overflow-hidden overflow-ellipsis text-2xl">
    <span class="whitespace-nowrap">Welcome back</span>
    <span class="text-primary whitespace-nowrap">DiscGolfUserName!</span>
  </h1>
  <div class="flex-10 overflow-y-hidden">
    {#each Array(30) as i, index}
      <section class="py-5">
        <h4>Match history item {index}</h4>
        <span>
          <p>Par 5</p>
          <p>Duration 30m</p>
        </span>
      </section>
    {/each}
  </div>
  <div class="grid grid-rows-2 gap-2">
    <Button class="bg-blue-500 py-8 text-2xl text-black">Start new game</Button>
    <Button class="bg-white py-8 text-2xl text-black">Profile</Button>
  </div>
</main>
