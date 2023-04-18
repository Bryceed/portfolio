<template>
	<div class="min-h-screen">
		<main>
			<section class="lg:px-[15%] px-[5%] pt-20">
				<h1
					class="lg:text-6xl text-4xl text-center leading-normal font-bold rainbow-text"
				>
					Blog
				</h1>
                <p class="lg:text-xl text-xl text-center leading-normal">
                    <br>Compartilhar conhecimento nunca é demais<br><br>
                </p>
			</section>
			<section class="lg:px-[15%] px-[5%] lg:pt-20 pt-14">
				<p
					class="text-left uppercase font-medium tracking-wider mb-10 text-gray-500"
				>
					POSTAGENS RECENTES
				</p>
				<div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
					<template
						v-for="(b, i) in blogNav[0].children"
						:key="`blogNavItem-${b._path}-${i}`"
					>
						<div class="px-7 py-5 rounded-lg border-2">
							<h2 class="text-lg font-semibold rainbow-text">
								{{ b.title }}
							</h2>
							<ul
								v-if="b.children"
								class="list-disc list-inside mt-4 pl-2 space-y-3"
							>
								<template
									v-for="(child, k) in b.children"
									:key="`childNav-${child._path}-${k}-${i}`"
								>
									<li
										class="list-item text-sm text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
									>
										<NuxtLink :to="`/blog${child._path}`">
											{{ child.title }}
										</NuxtLink>
									</li>
								</template>
							</ul>
							<ul v-else class="list-disc list-inside mt-4 pl-2 space-y-3">
								<li
									class="list-item text-sm text-gray-600 hover:text-primary-900 underline underline-offset-4 decoration-wavy decoration-primary/40 hover:decoration-primary transition-all"
								>
									<NuxtLink :to="`/blog${b._path}`"> Get Started </NuxtLink>
								</li>
							</ul>
						</div>
					</template>
				</div>
			</section>
            <section class="lg:px-[15%] px-[5%] pt-20">
                <p class="lg:text-lg text-sm text-center leading-normal font-bold text-gray-400">
                    <br>EM DESENVOLVIMENTO
                </p>
                <p class="lg:text-sm text-sm text-center leading-normal font-light text-gray-500">
                    <br>Esse blog está sendo criado com Nuxt Content, uma tecnologia de geração de CMS funcional a partir de conteúdos de texto com marcação (HTML, Markdown, XML, JSON, etc.)<br><br>
                </p>
                
			</section>
		</main>
	</div>
</template>

<script setup>
	const { data: blogNav } = await useAsyncData("navigation", () => {
		return fetchContentNavigation(queryContent("articles"));
	});
	useHead({
		title: "Content Blog",
	});
</script>