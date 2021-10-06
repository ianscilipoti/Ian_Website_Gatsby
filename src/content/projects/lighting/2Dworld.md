---
title: 2Dworld
description: A 2D lighting and engine
previewImg: preview.png
backgroundImg: background.png
x: 50
y: 10
color: "#bdb693"
---
This project began as two separate side projects. One being a distructable 2D world using the Marching Cubes algorithm. The other being an algorithm to generate 2D shadows for many light sources. 

![Lighting example](./lighting.png)

The World
----

The world is infinite and procedural. Tiles are generated around the player as they explore in any direction. The world data comes from a series of Perlin Noise layers which define different features such as terrain elevation as well as underground features such as cave rooms and cave passageways. 

The player can use a cannon tool to destroy terrain. World data is only saved after its been modified. Once the player destroys part of the world, the effected tiles are added to memory incase the modififed tiles are unloaded and loaded again. This allows the world to not consume significant memory during normal exploration. 

<iframe width="100%" height="500px" src="https://www.youtube.com/embed/-OSeQoR1gJw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Lighting Engine
---

Light is rendered as procedural mesh geometry. This comes with the benifit of static light sources consuming minimal resources. Additionally, many lights can be rendered at once without significant overhead. However, this poses challenges when combined with distructable terrain. The lighting engine is responsible for updating light geometry whenever the terrain is altered. 


