import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { ExpoScaleEase } from 'gsap/dist/EasePack';
import Image from 'next/image';

const Intro = () => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.main-text', {
        duration: 0.5,
        ease: ExpoScaleEase.config(1, 2),
        delay: 'random(0, .5, .1)',
        opacity: 0,
        transformOrigin: 'center',
        scale: 3,
      });

      gsap
        .timeline({ repeat: -1 })
        .from('.line', {
          scaleX: 0,
          transformOrigin: 'left',
        })
        .to('.line', {
          delay: 1,
          scaleX: 0,
          transformOrigin: 'right',
        });

      gsap.from('.scroll-div', {
        duration: 1.5,
        yPercent: +400,
      });

      const imgs = gsap.utils.toArray('.img');
      // gsap.set(imgs[0], { autoAlpha: 1 });
      const animationDuration = 10;
      const alphaDuration = 2;

      const crossfade = (index) => {
        gsap.fromTo(
          imgs[index],
          { scale: 1.7 },
          { scale: 1.5, duration: animationDuration }
        );
        gsap
          .timeline()
          .to(imgs[index], { autoAlpha: 1, duration: alphaDuration })
          .to(
            imgs[index],
            { autoAlpha: 0, duration: alphaDuration },
            animationDuration - alphaDuration
          );

        gsap.delayedCall(animationDuration / 2, () => {
          crossfade((index + 1) % imgs.length);
        });
      };
      gsap.delayedCall(1, () => {
        crossfade(0);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen py-12 box-border flex flex-col justify-between items-center overflow-hidden"
    >
      <div className="absolute h-full w-full bg-white">
        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/top03.jpg"
            alt="img4"
            fill
          />
        </div>
        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/top_06.jpg"
            alt="img1"
            fill
          />
        </div>
        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/kaido_040_top.jpg"
            alt="img1"
            fill
          />
        </div>
        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/img010.jpg"
            alt="img2"
            fill
          />
        </div>
        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/upload/YAMANAMI_4260WW.jpg"
            alt="img3"
            fill
          />
        </div>

        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/ktc_5549_top.jpg"
            alt="img5"
            fill
          />
        </div>
        <div className="img absolute w-full h-full invisible">
          <Image
            src="http://www.mikiyakobayashi.com/yhe500a_6133_top.jpg"
            alt="img6"
            fill
          />
        </div>
      </div>
      <div></div>
      <div className="text-3xl font-bold flex flex-row gap-3 flex-wrap">
        {[...'MIKIYA KOBAYASHI'].map((c, index) => {
          if (c === ' ')
            return (
              <pre key={index} className="text-2xl">
                {c}
              </pre>
            );
          else
            return (
              <p key={index} className="main-text">
                {c}
              </p>
            );
        })}
      </div>
      <div className="scroll-div flex flex-col gap-2">
        <p className="tracking-[.3rem] text-xs font-bold mx-3">
          scroll
        </p>
        <div className="line w-full h-[.15rem] bg-[#1a1a1a]"></div>
      </div>
    </section>
  );
};

export default Intro;
