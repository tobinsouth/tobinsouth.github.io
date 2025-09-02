---
layout: base.liquid
title: Blog
permalink: /index.html
---

<div class="blog-index max-w-4xl mx-auto">
  <div class="mb-12">
    <h2 class="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Latest Posts</h2>
    <p class="text-gray-600 text-lg">Thoughts on AI agents, MCP, security, and building things that matter.</p>
  </div>
  
  <div class="posts-list space-y-8">
    {% for post in collections.posts %}
    <article class="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200">
      <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl opacity-0 group-hover:opacity-5 transition-opacity"></div>
      <div class="relative">
        <time datetime="{{ post.date | date: "%Y-%m-%d" }}" class="text-sm text-gray-500 font-medium">
          {{ post.date | date: "%B %d, %Y" }}
        </time>
        <h3 class="text-2xl font-bold mt-2 mb-3">
          <a class="text-gray-900 hover:text-blue-600 transition-colors" href="/blog{{ post.url }}">
            {{ post.data.title }}
          </a>
        </h3>
        {% if post.data.description %}
        <p class="text-gray-600 leading-relaxed">{{ post.data.description }}</p>
        {% endif %}
        <div class="mt-4">
          <a href="/blog{{ post.url }}" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors">
            Read more
            <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </article>
    {% endfor %}
  </div>
  
  {% if collections.posts.size == 0 %}
  <div class="text-center py-16">
    <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
    </svg>
    <p class="text-gray-500 text-lg">No posts yet. Check back soon!</p>
  </div>
  {% endif %}
</div>