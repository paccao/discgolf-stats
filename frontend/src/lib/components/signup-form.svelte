<script lang="ts">
  import { Button } from '$lib/components/ui/button/index.js'
  import * as Card from '$lib/components/ui/card/index.js'
  import { Input } from '$lib/components/ui/input/index.js'
  import { Label } from '$lib/components/ui/label/index.js'
</script>

<Card.Root class="mx-auto max-w-sm">
  <Card.Header>
    <Card.Title class="text-2xl">Sign up</Card.Title>
  </Card.Header>
  <Card.Content>
    <div class="grid gap-4">
      <div class="grid gap-2">
        <Label for="username">Username</Label>
        <Input id="username" type="text" required />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="pwd">Password</Label>
        </div>
        <Input id="pwd" type="password" required />
      </div>
      <div class="grid gap-2">
        <div class="flex items-center">
          <Label for="pwd-repeat">Repeat password</Label>
        </div>
        <Input id="pwd-repeat" type="password" required />
      </div>
      <Button type="submit" class="w-full">Sign up</Button>
    </div>
    <div class="mt-4 text-center text-sm">
      <a href="/login" class="px-2 underline">Log in</a>
    </div>
  </Card.Content>
</Card.Root>
