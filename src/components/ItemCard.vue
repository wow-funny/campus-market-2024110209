<template>
  <article class="item-card">
    <div class="item-card__header">
      <h3>{{ title }}</h3>
      <span v-if="tag" class="tag">{{ tag }}</span>
    </div>

    <p class="description">{{ description }}</p>

    <div class="meta">
      <span v-if="location">地点：{{ location }}</span>
      <span v-if="time">时间：{{ time }}</span>
    </div>

    <div v-if="$slots.footer" class="footer">
      <slot name="footer" />
    </div>
  </article>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  tag?: string
  location?: string
  time?: string
}>()
</script>

<style scoped>
.item-card {
  padding: 20px;
  border-radius: var(--campus-radius);
  background: var(--campus-card-bg);
  border: 1px solid var(--campus-border);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.item-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 28px rgba(99, 102, 241, 0.1);
  border-color: #c7d2fe;
}

.item-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
}

.item-card h3 {
  margin: 0;
  font-size: 16px;
  color: var(--campus-text);
  font-weight: 600;
}

.tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: #eef2ff;
  color: #6366f1;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
}

.description {
  margin: 12px 0;
  color: var(--campus-text-secondary);
  line-height: 1.6;
  font-size: 14px;
}

.meta {
  display: flex;
  gap: 16px;
  color: #94a3b8;
  font-size: 13px;
}

.meta span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.meta span::before {
  font-size: 14px;
}

.meta span:first-child::before {
  content: '📍';
}

.meta span:last-child::before {
  content: '🕐';
}

.footer {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid #f1f5f9;
}
</style>
