<script>
  import Button from '$lib/components/ui/button/button.svelte'
</script>

<main class="mx-auto grid h-screen w-full max-w-3xl p-4">
  <h1
    class="text-primary w-full flex-1 overflow-hidden overflow-ellipsis text-3xl"
  >
    <span class="whitespace-nowrap">Welcome back</span>
    <span class="text-primary whitespace-nowrap">DiscGolfUserName!</span>
  </h1>
  <div class="relative overflow-y-hidden">
    {#each Array(31) as _i, index}
      <section class="py-5">
        <h4>Date and time of match {index + 1}</h4>
        <span>
          <p>Par 5</p>
          <p>Duration 30m</p>
        </span>
      </section>
    {/each}
    <div
      class="to-background absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-b from-transparent"
    ></div>
  </div>
  <div class="grid grid-rows-2 gap-2">
    <Button class="bg-blue-500 py-8 text-2xl text-black">Start new game</Button>
    <Button class="bg-white py-8 text-2xl text-black">Profile</Button>
  </div>
</main>
