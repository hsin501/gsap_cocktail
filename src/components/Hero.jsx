import React from 'react';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/all';
import gsap from 'gsap';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  // Ref for the video element
  const videoRef = React.useRef();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText('.title', { type: 'chars,words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    //大標題文字動畫
    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));
    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.05,
    });

    //副標題文字動畫
    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      delay: 1,
      stagger: 0.05,
    });

    //葉子移動動畫
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.left-leaf', { y: 200 }, 0)
      .to('.right-leaf', { y: -200 }, 0);

    //影片播放動畫
    const startValue = isMobile ? 'top 50%' : 'center 60%'; //如果是手機 頂部(top) 滑到螢幕的 50% 高度中間時開始觸發動畫。
    const endValue = isMobile ? '120% top' : 'bottom top'; //如果是 底部 120% 高度位置（超過底部）碰到 viewport 頂部時結束動畫。

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'video',
        start: startValue,
        end: endValue,
        scrub: true,
        pin: true,
      },
    });
    tl.from(videoRef.current, {
      scale: 1.2,
      transformOrigin: 'center center',
    });

    //當影片的 metadata 載入完成後，設定動畫結束時將影片撥放到最後一幀
    videoRef.current.onloadedmetadata = () => {
      tl.to(videoRef.current, {
        currentTime: videoRef.current.duration,
      });
    };
  }, []);

  return (
    <>
      <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>
        <img
          src='/images/hero-left-leaf.png'
          alt='left-leaf'
          className='left-leaf'
        />
        <img
          src='/images/hero-right-leaf.png'
          alt='right-leaf'
          className='right-leaf'
        />
        <div className='body'>
          <div className='content'>
            <div className='space-y-5 hidden md:block'>
              <p>Cool . Classic .</p>
              <p className='subtitle'>Good to Drink</p>
            </div>

            <div className='view-cocktails'>
              <p className='subtitle'>
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href='#cocktails'>View cocktails</a>
            </div>
          </div>
        </div>
      </section>
      <div className='video absolute inset-0'>
        <video
          ref={videoRef}
          src='/videos/output.mp4'
          muted
          playsInline
          preload='auto'
        ></video>
      </div>
    </>
  );
};

export default Hero;
