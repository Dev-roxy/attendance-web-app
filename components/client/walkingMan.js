"use client"
import wakingMan from '@/public/walk2.png';

export default function WalkingAnimation() {
  return (
    <div className="container">
      <div className="walk2"></div>
      <style jsx>{`
        body {
          margin: 0;
        }
        h1 {
          text-align: center;
          font-family: monospace;
        }
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @keyframes w1Effect {
          from {
            background-position: 0px;
          }
          to {
            background-position: -900px;
          }
        }
        .walk2 {
          mix-blend-mode: lighten;
          width: 150px;
          height: 300px;
          background-image: url(${wakingMan.src});
          background-repeat: no-repeat;
          background-size: 1200px;
          animation: w2Effect 1s steps(8) infinite;
        }
        @keyframes w2Effect {
          from {
            background-position: 0px;
          }
          to {
            background-position: -1200px;
          }
        }
      `}</style>
    </div>
  );
}
