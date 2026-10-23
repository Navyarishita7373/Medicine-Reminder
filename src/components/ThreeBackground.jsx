import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function ThreeBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      ref.current.clientWidth / ref.current.clientHeight,
      0.1,
      1000
    )

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(ref.current.clientWidth, ref.current.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    ref.current.appendChild(renderer.domElement)

    // Create gradient background
    const geometry = new THREE.PlaneGeometry(100, 100)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uColor1: { value: new THREE.Color('#0a0e17') },
        uColor2: { value: new THREE.Color('#111827') }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        void main() {
          float blend = smoothstep(0.3, 0.7, vUv.y);
          vec3 color = mix(uColor2, uColor1, blend);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    })

    material.translateOnMesh = new THREE.InstancedMesh(geometry, material, 10)
    scene.add(material.translateOnMesh)

    // Create floating orbs
    const orbs = []
    for (let i = 0; i < 5; i++) {
      const orbGeometry = new THREE.SphereGeometry(0.5 + Math.random(), 16, 16)
      const orbMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color([0x00d4aa, 0xff006e][Math.random() > 0.5]),
        transparent: true,
        opacity: 0.3 + Math.random() * 0.2,
      })
      const orb = new THREE.Mesh(orbGeometry, orbMaterial)
      orb.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      )
      orb.scale.setScalar(0.5 + Math.random())
      scene.add(orb)
      orbs.push({ mesh: orb, speed: 0.01 + Math.random() * 0.02 })
    }

    camera.position.z = 20

    const animate = () => {
      requestAnimationFrame(animate)
      orbs.forEach((orb) => {
        orb.mesh.rotation.x += orb.speed
        orb.mesh.rotation.y += orb.speed
      })
      material.translateOnMesh.rotation.y += 0.005
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = ref.current.clientWidth / ref.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(ref.current.clientWidth, ref.current.clientHeight)
    })

    return () => {
      renderer.dispose()
      ref.current.removeChild(renderer.domElement)
      window.removeEventListener('resize', () => null)
    }
  }, [ref])

  return <div ref={ref} className="absolute inset-0" />
}