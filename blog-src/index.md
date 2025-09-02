---
layout: base.liquid
title: Blog
permalink: /index.html
---

<div class="blog-index">
  <h2 class="text-3xl md:text-4xl font-bold mb-8 text-blue-600">Blog Posts</h2>
  
  <div class="posts-list space-y-6">
    {% for post in collections.posts %}
    <article class="border-b border-gray-200 pb-6 last:border-b-0">
      <h3 class="text-2xl font-semibold mb-2">
        <a class="text-blue-800 hover:text-blue-600 transition-colors" href="{{ post.url }}">{{ post.data.title }}</a>
      </h3>
      <p class="text-gray-600 text-sm mb-2">{{ post.date | date: "%B %d, %Y" }}</p>
      {% if post.data.description %}
      <p class="text-gray-700">{{ post.data.description }}</p>
      {% endif %}
    </article>
    {% endfor %}
  </div>
  
  {% if collections.posts.size == 0 %}
  <p class="text-gray-600 italic">No posts yet. Check back soon!</p>
  {% endif %}
</div>