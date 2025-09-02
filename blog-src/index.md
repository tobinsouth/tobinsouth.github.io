---
layout: base.liquid
title: Blog
permalink: /index.html
---

## Latest Posts

{% for post in collections.posts %}
<div style="margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid #e5e7eb;">
  <h3 style="font-size: 1.875rem; font-weight: 700; margin-bottom: 0.5rem;">
    <a href="/blog{{ post.url }}" style="color: #1e40af; text-decoration: none;">{{ post.data.title }}</a>
  </h3>
  <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">{{ post.date | date: "%B %d, %Y" }}</p>
  {% if post.data.description %}
  <p style="color: #4b5563; line-height: 1.6;">{{ post.data.description }}</p>
  {% endif %}
  <a href="/blog{{ post.url }}" style="color: #2563eb; text-decoration: none; font-weight: 500;">Read more →</a>
</div>
{% endfor %}

{% if collections.posts.size == 0 %}
<div style="text-align: center; padding: 4rem 0;">
  <p style="color: #6b7280; font-style: italic;">No posts yet. Check back soon!</p>
</div>
{% endif %}