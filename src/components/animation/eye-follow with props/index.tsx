'use client';

import { useRef, useEffect, useState, CSSProperties } from 'react';

interface EyePosition { x: number; y: number; }

/* ────────────────────── Props ────────────────────── */
type PositionPreset =
  | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

interface FollowingEyesProps {
  /** Width of the whole character in pixels (default 60) */
  size?: number;
  position?: PositionPreset;
  offsetX?: number;
  offsetY?: number;
  className?: string;
}

/* ─────────────────── Component ─────────────────── */
export default function FollowingEyes({
  size = 60,                 // ← tiny default
  position,
  offsetX = 0,
  offsetY = 0,
  className = '',
}: FollowingEyesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const leftPupilRef = useRef<SVGCircleElement>(null);
  const rightPupilRef = useRef<SVGCircleElement>(null);

  const [eyeTransform, setEyeTransform] = useState('translate(0px,0px)');
  const [bodyTransform, setBodyTransform] = useState<CSSProperties['transform']>('none');

  // -----------------------------------------------------------------
  // 1. Size handling – everything scales from the `size` prop
  // -----------------------------------------------------------------
  const BASE_WIDTH = 120;               // original width in the design
  const scale = size / BASE_WIDTH;       // e.g. 60 / 120 = 0.5

  // -----------------------------------------------------------------
  // 2. Positioning (same logic as before, but now we also scale)
  // -----------------------------------------------------------------
  const getPositionStyle = (): CSSProperties => {
    if (position) {
      const map: Record<PositionPreset, CSSProperties> = {
        'top-left':     { top: 48 + offsetY, left: 16 + offsetX },
        'top-right':    { top: 48 + offsetY, right: 16 - offsetX },
        'bottom-left':  { bottom: 48 + offsetY, left: 16 + offsetX },
        'bottom-right': { bottom: 48 + offsetY, right: 16 - offsetX },
        center: {
          top: '50%', left: '50%',
          transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
        },
      };
      return map[position];
    }
    return { top: 48 + offsetY, left: 16 + offsetX };
  };

  // -----------------------------------------------------------------
  // 3. Eye-follow logic (unchanged – only tiny refactor)
  // -----------------------------------------------------------------
  const LEFT_EYE: EyePosition = { x: 285, y: 180 };
  const RIGHT_EYE: EyePosition = { x: 370, y: 180 };
  const MAX_PUPIL_DISTANCE = 12;
  const MAX_EYE_MOVE = 8;
  const MAX_BODY_TILT = 5;
  const MAX_BODY_ROTATE = 8;

  const updatePupil = (
    pupil: SVGCircleElement,
    eyeCenter: EyePosition,
    mouseX: number,
    mouseY: number
  ) => {
    const dx = mouseX - eyeCenter.x;
    const dy = mouseY - eyeCenter.y;
    const angle = Math.atan2(dy, dx);
    const distance = Math.min(Math.hypot(dx, dy) / 8, MAX_PUPIL_DISTANCE);

    const pupilX = eyeCenter.x + Math.cos(angle) * distance;
    const pupilY = eyeCenter.y + Math.sin(angle) * distance;

    pupil.setAttribute('cx', pupilX.toString());
    pupil.setAttribute('cy', pupilY.toString());
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !svgRef.current || !leftPupilRef.current || !rightPupilRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();

      const centerX = containerRect.left + containerRect.width / 2;
      const centerY = containerRect.top + containerRect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.hypot(dx, dy) || 1;

      const eyeMoveX = (dx / distance) * Math.min(distance / 50, MAX_EYE_MOVE);
      const eyeMoveY = (dy / distance) * Math.min(distance / 50, MAX_EYE_MOVE);
      setEyeTransform(`translate(${eyeMoveX}px, ${eyeMoveY}px)`);

      const viewportCenterX = window.innerWidth / 2;
      const normalizedX = (e.clientX - viewportCenterX) / viewportCenterX;
      const normalizedY = (e.clientY - centerY) / window.innerHeight;

      const tiltX = normalizedX * MAX_BODY_TILT;
      const tiltY = normalizedY * MAX_BODY_TILT;
      const rotate = normalizedX * MAX_BODY_ROTATE;

      setBodyTransform(
        `perspective(1000px) rotateY(${tiltX}deg) rotateX(${-tiltY}deg) rotateZ(${rotate}deg) scale(1.02)`
      );

      const scaleX = 520 / svgRect.width;
      const scaleY = 360 / svgRect.height;
      const mouseX = (e.clientX - svgRect.left) * scaleX;
      const mouseY = (e.clientY - svgRect.top) * scaleY;

      updatePupil(leftPupilRef.current, LEFT_EYE, mouseX, mouseY);
      updatePupil(rightPupilRef.current, RIGHT_EYE, mouseX, mouseY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // -----------------------------------------------------------------
  // 4. Render
  // -----------------------------------------------------------------
  return (
    <div
      ref={containerRef}
      className={`
        fixed z-40 transition-transform duration-100 ease-out
        pointer-events-none ${className}
      `.trim()}
      style={{
        ...getPositionStyle(),
        transform: bodyTransform,
        transformOrigin: 'center center',
        width: `${size}px`,
        height: `${size * (100 / 120)}px`,   // keep original aspect ratio
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 520 360"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `scale(${scale})`, transformOrigin: '0 0' }}
      >
        {/* Face */}
        <path
          d="M410 205C410 318.218 326.718 270.5 213.5 270.5C100.282 270.5 0 318.218 0 205C0 91.7816 91.7816 0 205 0C318.218 0 410 91.7816 410 205Z"
          fill="#00D5FF"
        />

        {/* Eyes Group */}
        <g
          className="transition-transform duration-150 ease-out"
          style={{ transform: eyeTransform }}
        >
          <circle cx="285" cy="180" r="25" fill="#fff" />
          <circle ref={leftPupilRef} cx="285" cy="180" r="15" fill="#000" />
          <circle cx="370" cy="180" r="25" fill="#fff" />
          <circle ref={rightPupilRef} cx="370" cy="180" r="15" fill="#000" />
        </g>
      </svg>
    </div>
  );
}