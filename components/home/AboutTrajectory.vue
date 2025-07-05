<template>
  <aside class="about-trajectory">
    <h2>{{ $t('html.home.trajectoryTitle') }}</h2>
    <p>{{ $t('html.home.trajectoryParagraph1') }}</p>
    <p>{{ $t('html.home.trajectoryParagraph2') }}</p>
  </aside>
</template>

<script>
export default {
  name: 'AboutTrajectory'
};
</script>

<style scoped>
.about-trajectory {
  flex: 1 1 400px;
  border-radius: 12px;
  padding: 32px 24px;
  margin-bottom: 32px;
  color: #333;
  max-width: 480px;
  background:#f5f5f5;
}
html.dark .about-trajectory {
  background: #111;
    color: #f5f5f5;
}
.about-trajectory h2 {
  font-size: 2rem;
  margin-bottom: 16px;
  color: #4a3aff;
}
.about-trajectory p {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 12px;
}
@media (max-width: 900px) {
  .about-trajectory {
    max-width: 100%;
    margin-bottom: 20px;
  }
}
</style>
