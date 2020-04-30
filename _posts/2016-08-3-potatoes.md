---
layout: category-post
title:  "Potatoes"
date:   2015-11-25
categories: writing
---

## ECS Particle System
{%- highlight c# -%}

[Serializable]
public struct SpawnRandomInSphere : ISharedComponentData
{
    public Entity Entity;
    public float Radius;
    public int Count;
}

public class SpawnRandomInSphere : MonoBehaviour
{
    public Mesh Mesh;
    public Material Material;
    public float Radius;
    public int Count;

    private void spawnEntity(Entity entity, EntityManager em)
    {
        var spawnerData = new ECS.Particles.SpawnRandomInSphere
        {
            Radius = Radius,
            Count = Count
        };
        em.AddSharedComponentData(entity, spawnerData);
    }
}
{%- endhighlight -%}
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

# Heading 1
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

## Heading 2
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

### Heading 3
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

#### Heading 4
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

##### Heading 5
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

###### Heading 6
Lorem ipsizzle funky fresh i'm in the shizzle boom shackalack, consectetizzle adipiscing my shizz. Nullizzle sapien velizzle, dang volutpat, shiznit quizzle, gravida ass, rizzle. Pot get down get down tortor. Sed erizzle. Black go to hizzle dolizzle dapibizzle turpis fo shizzle my nizzle yo. Maurizzle pellentesque nibh et check it out. Bow wow wow check it out tortizzle. Pellentesque for sure rhoncizzle bow wow wow. In owned habitasse brizzle dictumst. Nizzle dapibizzle. Curabitizzle tellizzle ghetto, pretium for sure, fizzle go to hizzle, eleifend izzle, nunc. Dope suscipizzle. Integizzle boom shackalack velit ass purus.

{%- highlight html -%}
<div class="mb1">
  test
</div>
{%- endhighlight -%}
