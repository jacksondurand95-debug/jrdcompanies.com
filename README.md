# jrdcompanies.com
2026 JRD Companies Website 

<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>JRD Companies | Minnesota Fuel, Convenience & Auto Service</title>
  <meta name="description" content="JRD Companies operates Minnesota fuel stations, convenience stores, and Durand Automotive. Local ownership, clean stores, fair pricing, and honest service." />

  <!-- Open Graph -->
  <meta property="og:title" content="JRD Companies | Minnesota Fuel, Convenience & Auto Service" />
  <meta property="og:description" content="Fuel stations, convenience stores, and auto service you can trust across Minnesota." />
  <meta property="og:type" content="website" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">

  <style>
    :root{
      --bg:#070707;
      --bg2:#0d0d0d;
      --panel:#101010;
      --panel2:#151515;

      --cream:#f3eee3;
      --cream2:#d7d1c5;
      --muted:#a9a295;

      --orange:#e85d3b;
      --orange2:#c94a2a;
      --orangeGlow:rgba(232,93,59,.16);

      --green:#2d5a3d;
      --green2:#3a7a50;
      --greenGlow:rgba(58,122,80,.18);

      --steel:#8a8f9a;
      --stroke:rgba(255,255,255,.08);
      --shadow:rgba(0,0,0,.65);

      --radius:14px;
      --radius2:18px;
      --max:1240px;
    }

    *{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{
      font-family:Roboto,system-ui,-apple-system,Segoe UI,Arial,sans-serif;
      color:var(--cream);
      background: #070707;
      overflow-x:hidden;
      line-height:1.6;
      min-height:100vh;
    }

    /* Carbon + grit base */
    body::before{
      content:"";
      position:fixed;
      inset:0;
      z-index:-2;
      background:
        radial-gradient(ellipse 120% 70% at 20% 20%, rgba(232,93,59,.14), transparent 55%),
        radial-gradient(ellipse 90% 60% at 80% 70%, rgba(58,122,80,.16), transparent 50%),
        radial-gradient(ellipse 160% 120% at 50% 50%, rgba(0,0,0,.55), transparent 70%),
        repeating-linear-gradient(45deg, rgba(255,255,255,.035) 0px, rgba(255,255,255,.035) 2px, transparent 2px, transparent 10px),
        radial-gradient(circle at 50% 50%, #0a0a0a 0%, #050505 65%);
      background-attachment:fixed;
    }

    /* Noise overlay */
    body::after{
      content:"";
      position:fixed;
      inset:0;
      z-index:-1;
      pointer-events:none;
      opacity:.28;
      mix-blend-mode:overlay;
      background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='420' height='420'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='420' height='420' filter='url(%23n)' opacity='.75'/%3E%3C/svg%3E");
    }

    a{color:inherit;text-decoration:none}
    img{max-width:100%;display:block}

    .wrap{width:min(var(--max), calc(100% - 52px)); margin:0 auto;}
    @media (max-width:600px){ .wrap{width:calc(100% - 32px)} }

    /* ===== PASSWORD GATE ===== */
    #passwordGate{
      position:fixed;
      inset:0;
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
      background:linear-gradient(135deg, #070707 0%, #0f1a14 55%, #070707 100%);
    }
    #passwordGate::before{
      content:"";
      position:absolute;
      inset:-40px;
      background:
        repeating-linear-gradient(
          90deg,
          rgba(255,255,255,.05) 0px,
          rgba(255,255,255,.05) 6px,
          rgba(0,0,0,.0) 6px,
          rgba(0,0,0,.0) 22px
        ),
        radial-gradient(circle at 30% 30%, rgba(232,93,59,.20), transparent 45%),
        radial-gradient(circle at 75% 70%, rgba(58,122,80,.22), transparent 48%);
      opacity:.55;
      filter:blur(.2px);
    }
    #passwordGate::after{
      content:"";
      position:absolute;
      inset:0;
      background:
        radial-gradient(circle at 30% 40%, rgba(232,93,59,.15), transparent 50%),
        radial-gradient(circle at 70% 60%, rgba(58,122,80,.12), transparent 50%);
      opacity:.35;
    }
    .gate-box{
      position:relative;
      z-index:1;
      width:min(440px, 92vw);
      border-radius:18px;
      padding:44px 38px;
      background:linear-gradient(180deg, rgba(16,16,16,.88), rgba(10,10,10,.88));
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 30px 70px rgba(0,0,0,.75);
      overflow:hidden;
    }
    .gate-box::before{
      content:"";
      position:absolute;
      inset:0;
      background:
        radial-gradient(circle at 30% 20%, rgba(232,93,59,.20), transparent 55%),
        radial-gradient(circle at 80% 85%, rgba(58,122,80,.18), transparent 60%);
      opacity:.55;
      pointer-events:none;
    }
    .gate-brand{
      position:relative;
      display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
      gap:10px;
      margin-bottom:22px;
      text-align:center;
    }
    .gate-brand img{
      height:70px;
      width:auto;
      filter:drop-shadow(0 10px 18px rgba(0,0,0,.55));
    }
    .gate-title{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:3.5px;
      font-weight:700;
      font-size:1.3rem;
      color:var(--cream);
    }
    .gate-sub{
      color:rgba(255,255,255,.65);
      font-size:.95rem;
    }
    .gate-error{
      display:none;
      margin:14px 0 0;
      padding:12px 12px;
      border-radius:10px;
      background:rgba(232,93,59,.14);
      border:1px solid rgba(232,93,59,.35);
      color:#ffb1a1;
      font-weight:600;
      text-align:center;
      font-size:.95rem;
    }
    .gate-box input{
      width:100%;
      margin-top:18px;
      padding:16px 16px;
      border-radius:12px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(0,0,0,.35);
      color:var(--cream);
      outline:none;
      text-align:center;
      font-size:1.05rem;
      letter-spacing:2px;
      transition:border-color .2s, box-shadow .2s;
    }
    .gate-box input:focus{
      border-color:rgba(232,93,59,.7);
      box-shadow:0 0 0 4px rgba(232,93,59,.14);
    }
    .gate-btn{
      width:100%;
      margin-top:14px;
      padding:16px 16px;
      border-radius:12px;
      border:none;
      cursor:pointer;
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:3px;
      font-weight:800;
      font-size:1.05rem;
      color:#0b0b0b;
      background:linear-gradient(180deg, var(--orange), var(--orange2));
      box-shadow:0 18px 40px rgba(232,93,59,.22);
      transition:transform .15s, filter .15s;
      position:relative;
      z-index:1;
    }
    .gate-btn:hover{transform:translateY(-2px); filter:brightness(1.08)}
    .shake{animation:shake .28s}
    @keyframes shake{
      0%{transform:translateX(0)}
      25%{transform:translateX(-8px)}
      50%{transform:translateX(8px)}
      75%{transform:translateX(-6px)}
      100%{transform:translateX(0)}
    }

    /* ===== HEADER / NAV ===== */
    header{
      position:sticky;
      top:0;
      z-index:200;
      background:rgba(7,7,7,.92);
      backdrop-filter: blur(10px);
      border-bottom:1px solid rgba(255,255,255,.08);
    }
    .header-inner{
      padding:18px 0 12px;
      position:relative;
    }
    .nav{
      display:grid;
      grid-template-columns: 1fr auto 1fr;
      align-items:center;
      gap:18px;
    }
    .nav-left, .nav-right{
      display:flex;
      align-items:center;
      gap:26px;
    }
    .nav-left{justify-content:flex-start;padding-left:6px}
    .nav-right{justify-content:flex-end;padding-right:6px}

    .nav-link{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.6px;
      font-weight:600;
      font-size:.88rem;
      color:rgba(255,255,255,.76);
      padding:6px 0;
      position:relative;
      transition:color .2s;
    }
    .nav-link:hover{color:var(--orange)}
    .nav-link::after{
      content:"";
      position:absolute;
      left:0; right:0; bottom:0;
      height:2px;
      background:linear-gradient(90deg, transparent, var(--orange), transparent);
      transform:scaleX(0);
      transition:transform .2s;
      opacity:.9;
    }
    .nav-link:hover::after{transform:scaleX(1)}

    .nav-cta{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:10px 16px;
      border-radius:12px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(255,255,255,.05);
      color:var(--cream);
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.4px;
      font-weight:800;
      font-size:.82rem;
      transition:all .2s;
      white-space:nowrap;
    }
    .nav-cta:hover{
      border-color:rgba(232,93,59,.55);
      background:rgba(232,93,59,.10);
      color:var(--orange);
    }
    .nav-cta.portal{
      border-color:rgba(58,122,80,.5);
      background:rgba(58,122,80,.12);
    }
    .nav-cta.portal:hover{
      border-color:rgba(58,122,80,.7);
      background:rgba(58,122,80,.16);
      color:#aef1c9;
    }

    .nav-logo{
      display:flex;
      align-items:center;
      justify-content:center;
      position:relative;
      z-index:2;
      margin-bottom:-44px; /* hang */
    }
    .nav-logo a{
      display:flex;
      align-items:center;
      justify-content:center;
      gap:12px;
      padding:10px 14px;
      border-radius:16px;
      background:linear-gradient(180deg, rgba(255,255,255,.06), rgba(0,0,0,.08));
      border:1px solid rgba(255,255,255,.10);
      box-shadow:0 18px 50px rgba(0,0,0,.55);
    }
    .nav-logo img{
      height:54px;
      width:auto;
      filter:drop-shadow(0 10px 24px rgba(0,0,0,.65));
    }
    .nav-logo .wordmark{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:3px;
      font-weight:800;
      font-size:1.05rem;
      line-height:1;
    }
    .nav-logo .wordmark small{
      display:block;
      font-size:.72rem;
      letter-spacing:3.2px;
      color:rgba(255,255,255,.6);
      margin-top:4px;
      font-weight:600;
    }

    /* Mobile */
    .menu-btn{
      display:none;
      background:none;
      border:none;
      color:var(--cream);
      font-size:28px;
      cursor:pointer;
      padding:10px 8px;
    }
    .mobile-nav{
      display:none;
      flex-direction:column;
      gap:14px;
      padding:16px 0 20px;
      border-top:1px solid rgba(255,255,255,.06);
      margin-top:12px;
    }
    .mobile-nav a{
      padding:10px 0;
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.6px;
      font-weight:700;
      color:rgba(255,255,255,.75);
    }
    .mobile-nav a:hover{color:var(--orange)}
    .mobile-nav.active{display:flex}

    @media (max-width:1024px){
      .nav{grid-template-columns:auto 1fr auto}
      .nav-left,.nav-right{display:none}
      .menu-btn{display:block}
      .nav-logo{margin-bottom:-10px}
      .nav-logo img{height:42px}
      .nav-logo .wordmark{font-size:.98rem}
    }

    /* ===== BUTTONS ===== */
    .btn{
      display:inline-flex;
      align-items:center;
      justify-content:center;
      gap:10px;
      padding:14px 22px;
      border-radius:12px;
      border:1px solid rgba(255,255,255,.16);
      background:rgba(255,255,255,.04);
      color:var(--cream);
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.8px;
      font-weight:800;
      font-size:.92rem;
      cursor:pointer;
      transition:all .18s;
    }
    .btn:hover{
      border-color:rgba(232,93,59,.6);
      background:rgba(232,93,59,.12);
      color:var(--orange);
      transform:translateY(-2px);
    }
    .btn-primary{
      border:none;
      background:linear-gradient(180deg, var(--orange), var(--orange2));
      color:#0b0b0b;
      box-shadow:0 18px 44px rgba(232,93,59,.22);
    }
    .btn-primary:hover{
      filter:brightness(1.08);
      transform:translateY(-3px);
      color:#0b0b0b;
    }
    .btn-ghost{
      background:transparent;
    }
    .btn-green{
      border:1px solid rgba(58,122,80,.55);
      background:rgba(58,122,80,.12);
    }
    .btn-green:hover{
      border-color:rgba(58,122,80,.75);
      background:rgba(58,122,80,.18);
      color:#aef1c9;
    }

    /* ===== HERO ===== */
    .hero{
      padding:140px 0 36px;
      position:relative;
      overflow:hidden;
    }
    .hero::before{
      content:"";
      position:absolute;
      inset:-1px;
      background:
        radial-gradient(ellipse 140% 80% at 25% 30%, rgba(232,93,59,.18), transparent 55%),
        radial-gradient(ellipse 100% 60% at 80% 70%, rgba(58,122,80,.16), transparent 50%),
        linear-gradient(180deg, rgba(0,0,0,.20), rgba(0,0,0,.50));
      opacity:.85;
      z-index:-1;
    }
    .hero::after{
      content:"";
      position:absolute;
      inset:0;
      pointer-events:none;
      background:
        radial-gradient(circle at 20% 20%, rgba(232,93,59,.22), transparent 45%),
        radial-gradient(circle at 82% 72%, rgba(58,122,80,.22), transparent 48%),
        linear-gradient(135deg, rgba(255,255,255,.05) 0%, transparent 35%, rgba(255,255,255,.04) 70%, transparent 100%);
      opacity:.95;
      z-index:-1;
    }

    .hero-grid{
      display:grid;
      grid-template-columns: 1.1fr .9fr;
      gap:36px;
      align-items:center;
    }
    @media (max-width:1024px){
      .hero{padding:110px 0 28px}
      .hero-grid{grid-template-columns:1fr; gap:26px}
    }

    .hero-kicker{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:8px 14px;
      border-radius:999px;
      background:rgba(0,0,0,.35);
      border:1px solid rgba(255,255,255,.12);
      color:rgba(255,255,255,.78);
      font-family:JetBrains Mono, monospace;
      font-size:.85rem;
      margin-bottom:16px;
    }
    .hero-kicker .dot{
      width:9px;height:9px;border-radius:50%;
      background:linear-gradient(180deg, var(--orange), var(--orange2));
      box-shadow:0 0 0 4px rgba(232,93,59,.16);
    }

    .hero h1{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:6px;
      font-weight:800;
      font-size:clamp(2.3rem, 4.2vw, 3.7rem);
      line-height:1.08;
      text-shadow:0 4px 0 rgba(0,0,0,.25), 0 26px 60px rgba(0,0,0,.55);
      margin-bottom:14px;
    }
    .hero h1 span{
      background:linear-gradient(135deg, rgba(255,255,255,.92), rgba(255,255,255,.70));
      -webkit-background-clip:text;
      background-clip:text;
      color:transparent;
    }

    .hero-sub{
      color:rgba(255,255,255,.78);
      font-size:1.15rem;
      max-width:56ch;
      margin-bottom:22px;
      line-height:1.75;
    }

    .hero-actions{
      display:flex;
      gap:12px;
      flex-wrap:wrap;
      align-items:center;
      margin-bottom:20px;
    }

    .hero-micro{
      display:flex;
      gap:18px;
      flex-wrap:wrap;
      color:rgba(255,255,255,.68);
      font-size:.95rem;
    }
    .hero-micro a{color:rgba(255,255,255,.78)}
    .hero-micro a:hover{color:var(--orange)}
    .pill{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:8px 12px;
      border-radius:999px;
      background:rgba(0,0,0,.32);
      border:1px solid rgba(255,255,255,.10);
    }
    .pill svg{width:16px;height:16px;opacity:.9}

    /* Collage */
    .collage{
      position:relative;
      height:420px;
      border-radius:var(--radius2);
    }
    @media (max-width:1024px){ .collage{height:360px} }
    .collage-card{
      position:absolute;
      border-radius:18px;
      overflow:hidden;
      border:1px solid rgba(255,255,255,.10);
      box-shadow:0 28px 70px rgba(0,0,0,.60);
      background-size:cover;
      background-position:center;
      transform-origin:center;
    }
    .collage-card::before{
      content:"";
      position:absolute; inset:0;
      background:linear-gradient(180deg, rgba(0,0,0,.10), rgba(0,0,0,.58));
      opacity:.95;
    }
    .collage-card::after{
      content:"";
      position:absolute; inset:0;
      background:radial-gradient(circle at 30% 20%, rgba(232,93,59,.22), transparent 55%);
      opacity:.6;
      mix-blend-mode:screen;
    }
    .c1{
      left:0; top:30px;
      width:58%; height:72%;
      transform:rotate(-2.5deg);
      background:linear-gradient(135deg, rgba(232,93,59,.22), rgba(232,93,59,.08));
    }
    .c2{
      right:0; top:0;
      width:54%; height:62%;
      transform:rotate(3deg);
      background:linear-gradient(135deg, rgba(58,122,80,.22), rgba(58,122,80,.08));
    }
    .c3{
      left:16%; bottom:0;
      width:62%; height:58%;
      transform:rotate(0.8deg);
      background:linear-gradient(135deg, rgba(138,143,154,.18), rgba(138,143,154,.06));
    }
    .collage-card img.collage-logo{
      position:absolute;
      top:50%; left:50%;
      transform:translate(-50%, -50%);
      width:80%;
      height:80%;
      max-width:220px;
      max-height:220px;
      object-fit:contain;
      z-index:4;
      opacity:1;
      filter:drop-shadow(0 8px 24px rgba(0,0,0,.3)) brightness(1.15);
      transition:opacity .3s ease, transform .3s ease, filter .3s ease;
    }
    .collage-card:hover img.collage-logo{
      filter:drop-shadow(0 12px 32px rgba(0,0,0,.4)) brightness(1.25);
      transform:translate(-50%, -50%) scale(1.08);
    }
    .collage-badge{
      position:absolute;
      left:18px; bottom:18px;
      padding:10px 14px;
      border-radius:14px;
      background:rgba(0,0,0,.55);
      border:1px solid rgba(255,255,255,.12);
      display:flex;
      align-items:center;
      gap:10px;
      z-index:5;
      backdrop-filter: blur(8px);
    }
    .collage-badge strong{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.8px;
      font-size:.9rem;
    }
    .collage-badge span{
      color:rgba(255,255,255,.70);
      font-size:.92rem;
    }
    .badge-bar{
      width:4px;height:28px;border-radius:99px;
      background:linear-gradient(180deg, var(--orange), var(--green2));
      box-shadow:0 0 0 5px rgba(232,93,59,.12);
    }

    /* ===== FEATURE STRIP ===== */
    .strip{
      padding:18px 0;
      border-top:1px solid rgba(255,255,255,.07);
      border-bottom:1px solid rgba(255,255,255,.07);
      background:rgba(0,0,0,.20);
      margin-top:22px;
    }
    .strip-row{
      display:flex;
      gap:26px;
      flex-wrap:wrap;
      justify-content:center;
      align-items:center;
    }
    .strip-item{
      display:flex;
      align-items:center;
      gap:12px;
      color:rgba(255,255,255,.75);
      font-size:.95rem;
    }
    .strip-ico{
      width:42px;height:42px;border-radius:12px;
      display:grid;place-items:center;
      border:1px solid rgba(255,255,255,.10);
      background:rgba(255,255,255,.04);
    }
    .strip-ico svg{width:20px;height:20px;opacity:.9}
    .strip-item strong{
      color:rgba(255,255,255,.92);
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2px;
      font-size:.9rem;
      font-weight:800;
    }

    /* ===== SECTION BASE ===== */
    .section{padding:64px 0}
    @media (max-width:700px){ .section{padding:50px 0} }

    .section-head{
      display:flex;
      align-items:center;
      gap:18px;
      margin-bottom:28px;
    }
    .section-title{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:5px;
      font-weight:800;
      font-size:clamp(1.55rem, 2.8vw, 2.25rem);
      white-space:nowrap;
    }
    .section-line{
      flex:1;
      height:2px;
      background:linear-gradient(90deg, var(--orange), transparent 70%);
      opacity:.9;
    }

    /* ===== ABOUT ===== */
    .about{
      position:relative;
    }
    .about-grid{
      display:grid;
      grid-template-columns: 1.15fr .85fr;
      gap:28px;
      align-items:stretch;
    }
    @media (max-width:1024px){ .about-grid{grid-template-columns:1fr} }

    .panel{
      background:linear-gradient(180deg, rgba(16,16,16,.78), rgba(10,10,10,.78));
      border:1px solid rgba(255,255,255,.10);
      border-radius:var(--radius2);
      box-shadow:0 26px 70px rgba(0,0,0,.55);
      overflow:hidden;
      position:relative;
    }
    .panel::before{
      content:"";
      position:absolute;
      inset:0;
      background:
        radial-gradient(circle at 25% 25%, rgba(232,93,59,.14), transparent 58%),
        radial-gradient(circle at 80% 80%, rgba(58,122,80,.12), transparent 60%);
      opacity:.9;
      pointer-events:none;
    }
    .panel-inner{position:relative; padding:28px}
    .about p{
      color:rgba(255,255,255,.75);
      font-size:1.05rem;
      line-height:1.8;
      margin-bottom:14px;
    }
    .about p strong{color:rgba(255,255,255,.92)}
    .about p:last-child{margin-bottom:0}

    .stats{
      display:grid;
      grid-template-columns:repeat(3, 1fr);
      gap:14px;
      margin-top:20px;
    }
    @media (max-width:650px){ .stats{grid-template-columns:1fr; } }
    .stat{
      border-radius:16px;
      padding:18px 16px;
      background:rgba(0,0,0,.22);
      border:1px solid rgba(255,255,255,.10);
    }
    .stat .n{
      font-family:Oswald,sans-serif;
      font-weight:900;
      letter-spacing:2px;
      font-size:2.2rem;
      line-height:1;
    }
    .stat .l{
      margin-top:8px;
      font-family:JetBrains Mono, monospace;
      font-size:.85rem;
      color:rgba(255,255,255,.62);
      letter-spacing:1px;
      text-transform:uppercase;
    }

    .about-visual{
      min-height:320px;
      background:
        radial-gradient(circle at 30% 30%, rgba(232,93,59,.20), transparent 50%),
        radial-gradient(circle at 75% 70%, rgba(58,122,80,.18), transparent 50%),
        linear-gradient(180deg, rgba(16,16,16,.90), rgba(10,10,10,.90));
      border-radius:var(--radius2);
      border:1px solid rgba(255,255,255,.10);
      box-shadow:0 26px 70px rgba(0,0,0,.55);
      position:relative;
      overflow:hidden;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .about-visual::after{
      content:"";
      position:absolute;
      inset:0;
      background:
        linear-gradient(135deg, rgba(232,93,59,.18), transparent 40%),
        repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 6px);
      opacity:.65;
      mix-blend-mode:overlay;
    }
    .about-visual .stamp{
      position:absolute;
      left:18px;
      top:18px;
      padding:10px 12px;
      border-radius:14px;
      background:rgba(0,0,0,.58);
      border:1px solid rgba(255,255,255,.12);
      backdrop-filter: blur(8px);
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:3px;
      font-weight:900;
      font-size:.88rem;
      display:inline-flex;
      align-items:center;
      gap:10px;
    }
    .stamp b{
      color:var(--orange);
      font-family:JetBrains Mono, monospace;
      letter-spacing:1px;
      font-size:.85rem;
    }

    /* ===== TICKER ===== */
    .ticker{
      background:rgba(0,0,0,.35);
      border-top:1px solid rgba(255,255,255,.08);
      border-bottom:1px solid rgba(255,255,255,.08);
      position:relative;
      overflow:hidden;
    }
    .ticker::before{
      content:"";
      position:absolute;
      left:0; right:0; top:0;
      height:2px;
      background:linear-gradient(90deg, var(--orange), var(--green2), var(--orange));
      opacity:.9;
      filter:drop-shadow(0 0 14px rgba(232,93,59,.22));
    }
    .ticker::after{
      content:"";
      position:absolute;
      inset:0;
      pointer-events:none;
      background:repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 7px);
      opacity:.25;
      mix-blend-mode:overlay;
    }
    .ticker-window{
      overflow:hidden;
      padding:14px 0;
    }
    .ticker-track{
      display:flex;
      gap:20px;
      width:max-content;
      animation:ticker 28s linear infinite;
    }
    @keyframes ticker{
      0%{transform:translateX(0)}
      100%{transform:translateX(-50%)}
    }
    .tick{
      display:inline-flex;
      align-items:center;
      gap:10px;
      padding:10px 14px;
      border-radius:14px;
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.12);
      box-shadow:0 14px 30px rgba(0,0,0,.35);
      font-family:JetBrains Mono, monospace;
      font-size:.86rem;
      white-space:nowrap;
    }
    .tick .sym{
      font-family:Oswald,sans-serif;
      letter-spacing:2px;
      text-transform:uppercase;
      font-weight:900;
      color:#aef1c9;
    }
    .tick .lbl{color:rgba(255,255,255,.62); font-size:.78rem}
    .tick .px{color:rgba(255,255,255,.9); font-weight:700}
    .tick .chg{
      padding:3px 8px;
      border-radius:10px;
      font-weight:900;
      font-size:.78rem;
    }
    .tick .up{color:#aef1c9; background:rgba(58,122,80,.18); border:1px solid rgba(58,122,80,.25)}
    .tick .dn{color:#ffb1a1; background:rgba(232,93,59,.15); border:1px solid rgba(232,93,59,.25)}

    @media (prefers-reduced-motion:reduce){
      html{scroll-behavior:auto}
      .ticker-track{animation:none}
      .gate-btn:hover, .btn:hover, .nav-cta:hover{transform:none}
    }

    /* ===== BUSINESSES ===== */
    .biz-grid{
      display:grid;
      grid-template-columns: repeat(3, 1fr);
      gap:18px;
      align-items:stretch;
    }
    @media (max-width:1024px){ .biz-grid{grid-template-columns:1fr; } }

    .biz-card{
      border-radius:18px;
      overflow:hidden;
      border:1px solid rgba(255,255,255,.10);
      background:linear-gradient(180deg, rgba(20,20,20,.80), rgba(10,10,10,.80));
      box-shadow:0 26px 70px rgba(0,0,0,.55);
      position:relative;
      transition:transform .18s, box-shadow .18s, border-color .18s;
    }
    .biz-card:hover{
      transform:translateY(-6px);
      border-color:rgba(232,93,59,.35);
      box-shadow:0 34px 90px rgba(0,0,0,.65);
    }

    .biz-hero{
      position:relative;
      height:180px;
      background-size:cover;
      background-position:center;
      display:flex;
      align-items:center;
      justify-content:center;
    }
    .biz-logo{
      position:relative;
      z-index:3;
      max-height:140px;
      max-width:220px;
      object-fit:contain;
      filter:drop-shadow(0 12px 30px rgba(0,0,0,.65));
      transition:transform .25s ease;
    }
    .biz-card:hover .biz-logo{
      transform:scale(1.06);
    }
    .biz-logo-text{
      position:relative;
      z-index:3;
      letter-spacing:3px;
      text-transform:uppercase;
    }
    .biz-hero::before{
      content:"";
      position:absolute; inset:0;
      background:linear-gradient(180deg, rgba(0,0,0,.12), rgba(0,0,0,.80));
    }
    .biz-hero::after{
      content:"";
      position:absolute; inset:0;
      background:radial-gradient(circle at 30% 20%, rgba(232,93,59,.24), transparent 55%);
      opacity:.75;
      mix-blend-mode:screen;
    }

    .biz-top{
      position:absolute;
      left:16px; right:16px; bottom:14px;
      display:flex;
      align-items:flex-end;
      justify-content:space-between;
      gap:12px;
      z-index:2;
    }
    .biz-title{
      display:flex;
      flex-direction:column;
      gap:4px;
    }
    .biz-title h3{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.6px;
      font-weight:900;
      font-size:1.15rem;
      line-height:1.1;
    }
    .biz-title p{
      color:rgba(255,255,255,.70);
      font-size:.95rem;
      margin:0;
    }
    .status-badge{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:8px 12px;
      border-radius:999px;
      background:rgba(0,0,0,.50);
      border:1px solid rgba(255,255,255,.12);
      color:rgba(255,255,255,.78);
      font-family:JetBrains Mono, monospace;
      font-size:.78rem;
      white-space:nowrap;
      backdrop-filter: blur(8px);
    }
    .status-dot{
      width:8px;height:8px;border-radius:50%;
      background:#aef1c9;
      box-shadow:0 0 0 4px rgba(58,122,80,.16);
    }
    .status-dot.closed{
      background:#ffb1a1;
      box-shadow:0 0 0 4px rgba(232,93,59,.14);
    }

    .biz-body{
      padding:18px 18px 16px;
      position:relative;
    }
    .meta{
      display:grid;
      gap:12px;
      margin-bottom:14px;
      color:rgba(255,255,255,.72);
      font-size:.95rem;
    }
    .meta-row{
      display:flex;
      gap:10px;
      align-items:flex-start;
    }
    .meta-row svg{width:18px;height:18px;opacity:.9; margin-top:2px}
    .meta-row strong{
      color:rgba(255,255,255,.92);
      display:block;
      font-weight:800;
    }

    .tags{
      display:flex;
      flex-wrap:wrap;
      gap:8px;
      margin:10px 0 16px;
    }
    .tag{
      display:inline-flex;
      align-items:center;
      gap:8px;
      padding:8px 10px;
      border-radius:999px;
      border:1px solid rgba(255,255,255,.12);
      background:rgba(255,255,255,.05);
      color:rgba(255,255,255,.74);
      font-family:JetBrains Mono, monospace;
      font-size:.78rem;
      white-space:nowrap;
    }
    .tag.orange{border-color:rgba(232,93,59,.26); background:rgba(232,93,59,.10); color:#ffcabf}
    .tag.green{border-color:rgba(58,122,80,.26); background:rgba(58,122,80,.12); color:#bdf4d5}

    .biz-actions{
      display:flex;
      gap:10px;
      flex-wrap:wrap;
      margin-top:6px;
    }
    .btn-sm{
      padding:12px 14px;
      font-size:.82rem;
      letter-spacing:2.4px;
      border-radius:12px;
    }

    /* ===== WHY ===== */
    .why-grid{
      display:grid;
      grid-template-columns:repeat(4, 1fr);
      gap:14px;
    }
    @media (max-width:1024px){ .why-grid{grid-template-columns:repeat(2, 1fr)} }
    @media (max-width:600px){ .why-grid{grid-template-columns:1fr} }

    .why-card{
      border-radius:18px;
      padding:20px 18px;
      background:rgba(0,0,0,.25);
      border:1px solid rgba(255,255,255,.10);
      box-shadow:0 18px 44px rgba(0,0,0,.45);
      transition:transform .18s, border-color .18s;
      position:relative;
      overflow:hidden;
    }
    .why-card::before{
      content:"";
      position:absolute; inset:0;
      background:radial-gradient(circle at 20% 20%, rgba(232,93,59,.12), transparent 58%);
      opacity:.85;
      pointer-events:none;
    }
    .why-card:hover{transform:translateY(-5px); border-color:rgba(232,93,59,.34)}
    .why-ico{
      width:52px;height:52px;border-radius:16px;
      display:grid;place-items:center;
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.10);
      margin-bottom:12px;
    }
    .why-ico svg{width:22px;height:22px;opacity:.95}
    .why-card h4{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.8px;
      font-weight:900;
      font-size:1.02rem;
      margin-bottom:8px;
    }
    .why-card p{
      color:rgba(255,255,255,.70);
      font-size:.95rem;
      line-height:1.7;
    }

    /* ===== CONTACT ===== */
    .contact-grid{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:18px;
      align-items:start;
    }
    @media (max-width:900px){ .contact-grid{grid-template-columns:1fr} }

    .form label{
      display:block;
      margin:14px 0 6px;
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:2.6px;
      font-weight:800;
      font-size:.78rem;
      color:rgba(255,255,255,.70);
    }
    .form input, .form textarea, .form select{
      width:100%;
      border-radius:12px;
      border:1px solid rgba(255,255,255,.14);
      background:rgba(0,0,0,.26);
      color:var(--cream);
      padding:14px 14px;
      outline:none;
      font:inherit;
      transition:border-color .2s, box-shadow .2s;
    }
    .form textarea{min-height:110px; resize:vertical}
    .form input:focus, .form textarea:focus, .form select:focus{
      border-color:rgba(232,93,59,.55);
      box-shadow:0 0 0 4px rgba(232,93,59,.14);
    }
    .form-status{
      display:none;
      margin-top:12px;
      padding:12px 12px;
      border-radius:12px;
      background:rgba(58,122,80,.14);
      border:1px solid rgba(58,122,80,.25);
      color:#bdf4d5;
      font-weight:700;
      text-align:center;
    }

    /* ===== FOOTER ===== */
    footer{
      padding:38px 0;
      border-top:1px solid rgba(255,255,255,.08);
      background:rgba(0,0,0,.22);
      margin-top:30px;
    }
    .footer-grid{
      display:grid;
      grid-template-columns: 1.2fr 1fr 1fr;
      gap:26px;
      align-items:start;
    }
    @media (max-width:900px){ .footer-grid{grid-template-columns:1fr} }
    .foot h5{
      font-family:Oswald,sans-serif;
      text-transform:uppercase;
      letter-spacing:3px;
      font-weight:900;
      font-size:.95rem;
      margin-bottom:12px;
    }
    .foot p, .foot a{
      color:rgba(255,255,255,.60);
      font-size:.92rem;
      line-height:1.8;
    }
    .foot a:hover{color:var(--orange)}
    .foot-links{list-style:none}
    .foot-links li{margin-bottom:10px}
    .footer-bottom{
      display:flex;
      justify-content:space-between;
      align-items:center;
      gap:16px;
      margin-top:24px;
      padding-top:20px;
      border-top:1px solid rgba(255,255,255,.08);
      color:rgba(255,255,255,.50);
      font-size:.88rem;
      flex-wrap:wrap;
    }
    .social{
      display:flex;
      gap:10px;
      align-items:center;
    }
    .social a{
      width:42px;height:42px;border-radius:14px;
      display:grid;place-items:center;
      background:rgba(255,255,255,.05);
      border:1px solid rgba(255,255,255,.10);
      transition:all .18s;
    }
    .social a:hover{
      border-color:rgba(232,93,59,.40);
      background:rgba(232,93,59,.10);
      transform:translateY(-2px);
    }
    .social svg{width:18px;height:18px;opacity:.85}

    /* Minor utility */
    .muted{color:rgba(255,255,255,.66)}
  </style>
</head>

<body>

  <!-- Password Gate -->
  <div id="passwordGate" aria-hidden="false">
    <div class="gate-box" role="dialog" aria-modal="true" aria-label="Site Access">
      <div class="gate-brand">
        <img src="jrd-assets/jrd-companies-chrome.png" alt="JRD Companies" style="height:70px;width:auto;">
        <div class="gate-title">JRD Companies</div>
        <div class="gate-sub">Enter password to continue</div>
      </div>

      <div id="gateError" class="gate-error">Incorrect password</div>

      <input type="password" id="gatePassword" placeholder="Enter Password" autocomplete="current-password" autofocus>
      <button class="gate-btn" id="gateBtn" type="button">Enter Site</button>

      <div style="margin-top:14px;text-align:center;color:rgba(255,255,255,.52);font-size:.85rem;">
        <span style="font-family:JetBrains Mono, monospace;">Protected access</span>
      </div>
    </div>
  </div>

  <div id="mainContent" style="display:none">

    <!-- Header -->
    <header>
      <div class="header-inner">
        <div class="wrap">
          <nav class="nav" aria-label="Primary Navigation">
            <div class="nav-left">
              <a class="nav-link" href="#home">Home</a>
              <a class="nav-link" href="#businesses">Businesses</a>
              <a class="nav-link" href="#why">Why JRD</a>
            </div>

            <div class="nav-logo">
              <a href="#home" aria-label="JRD Companies Home">
                <img src="jrd-assets/jrd-companies-chrome.png" alt="JRD Companies" style="height:60px;">
                <div class="wordmark">
                  <small style="font-size:.82rem;letter-spacing:2.5px;">Fuel &bull; Convenience &bull; Auto Service</small>
                </div>
              </a>
            </div>

            <div class="nav-right">
              <a class="nav-link" href="#contact">Contact</a>
              <a class="nav-cta" href="#businesses">Find a Location</a>
              <a class="nav-cta portal" href="/portal/">Portal</a>
            </div>

            <button class="menu-btn" type="button" aria-label="Menu" onclick="toggleMobileMenu()">&#9776;</button>
          </nav>

          <div class="mobile-nav" id="mobileNav" aria-label="Mobile Navigation">
            <a href="#home" onclick="closeMobileMenu()">Home</a>
            <a href="#businesses" onclick="closeMobileMenu()">Businesses</a>
            <a href="#why" onclick="closeMobileMenu()">Why JRD</a>
            <a href="#contact" onclick="closeMobileMenu()">Contact</a>
            <a href="/portal/" onclick="closeMobileMenu()">Portal</a>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero -->
    <main id="home">
      <section class="hero">
        <div class="wrap">
          <div class="hero-grid">
            <div>
              <div class="hero-kicker"><span class="dot"></span> Minnesota-owned operations &bull; Fuel + Auto</div>

              <h1><span>Fuel. Convenience.<br>Auto Service.</span></h1>
              <p class="hero-sub">
                Hard-working stations and a no-BS auto shop across Minnesota.
                Clean stores. Fair prices. Honest repairs. Built for the communities we serve.
              </p>

              <div class="hero-actions">
                <a class="btn btn-primary" href="#businesses">Explore Locations</a>
                <a class="btn btn-green" href="/portal/">Employee Portal</a>
                <a class="btn btn-ghost" href="#contact">Request Info</a>
              </div>

              <div class="hero-micro">
                <span class="pill" title="Phone">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <a href="tel:+16517394940">(651) 739-4940</a>
                </span>

                <span class="pill" title="Email">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/>
                  </svg>
                  <a href="mailto:info@jrdcompanies.com">info@jrdcompanies.com</a>
                </span>

                <span class="pill" title="Coverage">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 21s-7-4.5-7-11a7 7 0 1 1 14 0c0 6.5-7 11-7 11z"/>
                    <circle cx="12" cy="10" r="2.5"/>
                  </svg>
                  Twin Cities Metro + Surrounding
                </span>
              </div>
            </div>

            <div class="collage" aria-hidden="true">
              <div class="collage-card c1">
                <img src="jrd-assets/holiday-watermark.png" alt="Holiday" class="collage-logo">
              </div>
              <div class="collage-card c2">
                <img src="jrd-assets/innout-watermark.png" alt="IN N OUT" class="collage-logo">
              </div>
              <div class="collage-card c3">
                <img src="jrd-assets/durand-watermark.png" alt="Durand Automotive" class="collage-logo">
              </div>
              <div class="collage-badge">
                <span class="badge-bar"></span>
                <div>
                  <strong>Fuel + Auto</strong><br>
                  <span>One operator. Multiple brands.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="strip" role="region" aria-label="Highlights">
            <div class="strip-row">
              <div class="strip-item">
                <span class="strip-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14"/>
                    <path d="M9 21v-4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v4"/>
                    <path d="M10 9h4M10 12h4"/>
                  </svg>
                </span>
                <div><strong>Clean Stores</strong><div class="muted">Convenience done right</div></div>
              </div>

              <div class="strip-item">
                <span class="strip-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v7"/><path d="M8.5 6.5 12 9l3.5-2.5"/>
                    <path d="M7 9h10l-1 13H8L7 9z"/>
                  </svg>
                </span>
                <div><strong>24/7 Fuel</strong><div class="muted">Always on, always ready</div></div>
              </div>

              <div class="strip-item">
                <span class="strip-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </span>
                <div><strong>Honest Repairs</strong><div class="muted">Diagnostics &rarr; fix it right</div></div>
              </div>

              <div class="strip-item">
                <span class="strip-ico">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 21s-8-4-8-11a8 8 0 1 1 16 0c0 7-8 11-8 11z"/>
                    <path d="M9.5 10.5 11 12l3.5-3.5"/>
                  </svg>
                </span>
                <div><strong>Local Ownership</strong><div class="muted">Community-first mindset</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Ticker -->
      <section class="ticker" aria-label="Energy & Market Ticker">
        <div class="wrap">
          <div class="ticker-window">
            <div id="tickerTrack" class="ticker-track"></div>
          </div>
        </div>
      </section>

      <!-- About -->
      <section class="section about" id="about">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">Built for Minnesota</h2>
            <div class="section-line"></div>
          </div>

          <div class="about-grid">
            <div class="panel">
              <div class="panel-inner">
                <p>
                  <strong>JRD Companies</strong> operates fuel stations, convenience retail, and a full-service automotive shop.
                  The mission is simple: run clean locations, staff strong teams, and do business the right way.
                </p>
                <p>
                  Whether you're fueling up, grabbing essentials, or getting your vehicle repaired,
                  you should get straight answers, fair pricing, and service that respects your time.
                </p>
                <p style="color:#bdf4d5">
                  No gimmicks. No excuses. Just reliable operations.
                </p>

                <div class="stats" aria-label="Company stats">
                  <div class="stat">
                    <div class="n">3</div>
                    <div class="l">Core locations</div>
                  </div>
                  <div class="stat">
                    <div class="n">15+</div>
                    <div class="l">Years operating</div>
                  </div>
                  <div class="stat">
                    <div class="n">24/7</div>
                    <div class="l">Fuel access</div>
                  </div>
                </div>
              </div>
            </div>

            <div class="about-visual" role="img" aria-label="JRD Companies Branding">
              <img src="jrd-assets/jrd-companies-chrome.png" alt="JRD Companies" style="max-height:140px;max-width:200px;object-fit:contain;filter:drop-shadow(0 14px 32px rgba(0,0,0,.55));position:relative;z-index:2;">
              <div class="stamp">Ops Status <b>LIVE</b></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Businesses -->
      <section class="section" id="businesses">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">Our Businesses</h2>
            <div class="section-line"></div>
          </div>

          <div class="biz-grid">

            <!-- Holiday -->
            <a class="biz-card" href="/holiday.html" aria-label="Holiday Stationstores - Lakeville">
              <div class="biz-hero" style="background:linear-gradient(135deg, rgba(232,93,59,.25) 0%, rgba(232,93,59,.08) 100%);">
                <img src="jrd-assets/holiday-logo.png" alt="Holiday" class="biz-logo">
                <div class="biz-top">
                  <div class="biz-title">
                    <h3>Holiday Stationstores</h3>
                    <p>Store #3851 &bull; Lakeville</p>
                  </div>
                  <div class="status-badge" data-status="holiday">
                    <span class="status-dot"></span>
                    <span>Live &bull; Fuel</span>
                  </div>
                </div>
              </div>

              <div class="biz-body">
                <div class="meta">
                  <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div>
                      <strong>Address</strong>
                      16255 Ipava Ave, Lakeville, MN 55044
                    </div>
                  </div>
                  <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <div>
                      <strong>Phone</strong>
                      <span class="muted">(952) 435-7827</span>
                    </div>
                  </div>
                </div>

                <div class="tags">
                  <span class="tag orange">Fuel</span>
                  <span class="tag">C-Store</span>
                  <span class="tag green">24/7</span>
                  <span class="tag">ATM</span>
                </div>

                <div class="biz-actions">
                  <span class="btn btn-sm btn-primary">View Prices</span>
                  <span class="btn btn-sm">Store Details</span>
                </div>
              </div>
            </a>

            <!-- IN N OUT -->
            <a class="biz-card" href="/innout.html" aria-label="IN N OUT - Maplewood">
              <div class="biz-hero" style="background:linear-gradient(135deg, rgba(58,122,80,.25) 0%, rgba(58,122,80,.08) 100%);">
                <img src="jrd-assets/in-n-out-logo.png" alt="IN N OUT" class="biz-logo">
                <div class="biz-top">
                  <div class="biz-title">
                    <h3>IN N OUT</h3>
                    <p>Minnoco Fuel &bull; Maplewood</p>
                  </div>
                  <div class="status-badge" data-status="innout">
                    <span class="status-dot"></span>
                    <span>Live &bull; Fuel</span>
                  </div>
                </div>
              </div>

              <div class="biz-body">
                <div class="meta">
                  <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div>
                      <strong>Address</strong>
                      1935 English St, Maplewood, MN 55109
                    </div>
                  </div>
                  <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <div>
                      <strong>Phone</strong>
                      <span class="muted">(651) 770-2818</span>
                    </div>
                  </div>
                </div>

                <div class="tags">
                  <span class="tag orange">Minnoco Fuel</span>
                  <span class="tag">Convenience</span>
                  <span class="tag">Lottery</span>
                  <span class="tag green">Open</span>
                </div>

                <div class="biz-actions">
                  <span class="btn btn-sm btn-primary">View Prices</span>
                  <span class="btn btn-sm">Store Details</span>
                </div>
              </div>
            </a>

            <!-- Durand Automotive -->
            <a class="biz-card" href="https://durand-auto.com" aria-label="Durand Automotive - Maplewood">
              <div class="biz-hero" style="background:linear-gradient(135deg, rgba(138,143,154,.22) 0%, rgba(138,143,154,.08) 100%);">
                <img src="jrd-assets/durand-automotive-logo.png" alt="Durand Automotive" class="biz-logo">
                <div class="biz-top">
                  <div class="biz-title">
                    <h3>Durand Automotive</h3>
                    <p>Honest Auto Repair</p>
                  </div>
                  <div class="status-badge" data-status="auto">
                    <span class="status-dot" id="autoDot"></span>
                    <span id="autoStatusText">Checking hours...</span>
                  </div>
                </div>
              </div>

              <div class="biz-body">
                <div class="meta">
                  <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    <div>
                      <strong>Address</strong>
                      1929 English St, Maplewood, MN 55109
                    </div>
                  </div>
                  <div class="meta-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                    <div>
                      <strong>Phone</strong>
                      <span>(651) 739-4940</span>
                    </div>
                  </div>
                </div>

                <div class="tags">
                  <span class="tag green">ASE Certified</span>
                  <span class="tag">Diagnostics</span>
                  <span class="tag orange">Brakes</span>
                  <span class="tag">Tires</span>
                </div>

                <div class="biz-actions">
                  <span class="btn btn-sm btn-primary">View Services</span>
                  <span class="btn btn-sm">Schedule</span>
                </div>
              </div>
            </a>

          </div>
        </div>
      </section>

      <!-- Why -->
      <section class="section" id="why">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">Why JRD</h2>
            <div class="section-line"></div>
          </div>

          <div class="why-grid">
            <div class="why-card">
              <div class="why-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <h4>Fair Pricing</h4>
              <p>Competitive fuel pricing and straight repair estimates. No hidden fees, no games.</p>
            </div>

            <div class="why-card">
              <div class="why-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 21s-7-4.5-7-11a7 7 0 1 1 14 0c0 6.5-7 11-7 11z"/>
                  <path d="M9.5 10.5 11 12l3.5-3.5"/>
                </svg>
              </div>
              <h4>Local Ownership</h4>
              <p>Owner-operated, community-focused. Decisions are made here, not in another state.</p>
            </div>

            <div class="why-card">
              <div class="why-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <h4>Quality Work</h4>
              <p>Strong processes, clean sites, and technicians who fix it right-first time.</p>
            </div>

            <div class="why-card">
              <div class="why-ico">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <h4>Convenience</h4>
              <p>24/7 fuel operations + fast service workflows so customers aren't stuck waiting.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact -->
      <section class="section" id="contact">
        <div class="wrap">
          <div class="section-head">
            <h2 class="section-title">Contact</h2>
            <div class="section-line"></div>
          </div>

          <div class="contact-grid">
            <div class="panel">
              <div class="panel-inner">
                <p style="margin-bottom:0">
                  Use this form for general questions, partnership inquiries, or operations requests.
                  For auto repair appointments, use the Durand site scheduling flow.
                </p>

                <div style="margin-top:16px;display:flex;gap:12px;flex-wrap:wrap">
                  <a class="btn btn-sm btn-primary" href="#businesses">Find a Location</a>
                  <a class="btn btn-sm btn-green" href="/portal/">Portal</a>
                  <a class="btn btn-sm" href="mailto:info@jrdcompanies.com">Email Us</a>
                </div>
              </div>
            </div>

            <div class="panel">
              <div class="panel-inner">
                <form class="form" id="contactForm" onsubmit="return handleContactSubmit(event)">
                  <label for="cName">Full Name *</label>
                  <input id="cName" name="name" type="text" autocomplete="name" required>

                  <label for="cEmail">Email *</label>
                  <input id="cEmail" name="email" type="email" autocomplete="email" required>

                  <label for="cTopic">Topic</label>
                  <select id="cTopic" name="topic">
                    <option value="General">General</option>
                    <option value="Fuel / Store Ops">Fuel / Store Ops</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Vendors / Partnerships">Vendors / Partnerships</option>
                  </select>

                  <label for="cMsg">Message</label>
                  <textarea id="cMsg" name="message" placeholder="What do you need?"></textarea>

                  <button class="btn btn-primary" style="width:100%;margin-top:16px" type="submit">Send Message</button>
                  <div id="contactStatus" class="form-status">Opening your email client...</div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer>
      <div class="wrap">
        <div class="footer-grid">
          <div class="foot">
            <h5>JRD Companies</h5>
            <p>Fuel stations, convenience retail, and automotive service across Minnesota.</p>
            <p style="margin-top:12px"><strong>Phone:</strong> <a href="tel:+16517394940">(651) 739-4940</a></p>
            <p><strong>Email:</strong> <a href="mailto:info@jrdcompanies.com">info@jrdcompanies.com</a></p>
          </div>

          <div class="foot">
            <h5>Quick Links</h5>
            <ul class="foot-links">
              <li><a href="#businesses">Businesses</a></li>
              <li><a href="/holiday.html">Holiday</a></li>
              <li><a href="/innout.html">IN N' OUT</a></li>
              <li><a href="https://durand-auto.com">Durand Automotive</a></li>
              <li><a href="/portal/">Portal</a></li>
            </ul>
          </div>

          <div class="foot">
            <h5>Operating Hours</h5>
            <p><strong>Fuel:</strong> 24/7</p>
            <p><strong>Auto Service:</strong> Mon-Fri 7:30 AM - 5:30 PM</p>
          </div>
        </div>

        <div class="footer-bottom">
          <span>&copy; <span id="year"></span> JRD Companies. All rights reserved.</span>
          <div class="social" aria-label="Social Links">
            <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="https://google.com/maps" target="_blank" rel="noopener" aria-label="Google Maps">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

  </div><!-- /mainContent -->

  <script>
    /* =========================
       Password Gate
       ========================= */
    const SITE_PASSWORD = 'jackd';

    const gate = document.getElementById('passwordGate');
    const main = document.getElementById('mainContent');
    const gateInput = document.getElementById('gatePassword');
    const gateBtn = document.getElementById('gateBtn');
    const gateError = document.getElementById('gateError');

    function openSite(){
      sessionStorage.setItem('jrd_access', 'granted');
      gate.style.display = 'none';
      main.style.display = 'block';
      gate.setAttribute('aria-hidden', 'true');
      updateAutoHoursStatus();
    }

    function failGate(){
      gateError.style.display = 'block';
      gateInput.value = '';
      gateInput.focus();
      const box = document.querySelector('.gate-box');
      box.classList.remove('shake');
      void box.offsetWidth;
      box.classList.add('shake');
    }

    function checkGate(){
      const pw = (gateInput.value || '').toLowerCase().trim();
      if (pw === String(SITE_PASSWORD).toLowerCase()){
        openSite();
      } else {
        failGate();
      }
    }

    if (sessionStorage.getItem('jrd_access') === 'granted'){
      gate.style.display = 'none';
      main.style.display = 'block';
      gate.setAttribute('aria-hidden', 'true');
    }

    gateBtn.addEventListener('click', checkGate);
    gateInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') checkGate();
    });

    /* =========================
       Mobile Menu
       ========================= */
    function toggleMobileMenu(){
      document.getElementById('mobileNav').classList.toggle('active');
    }
    function closeMobileMenu(){
      document.getElementById('mobileNav').classList.remove('active');
    }

    /* =========================
       Contact Form (mailto)
       ========================= */
    function handleContactSubmit(e){
      e.preventDefault();
      const form = e.target;
      const data = Object.fromEntries(new FormData(form).entries());
      const status = document.getElementById('contactStatus');

      const subject = encodeURIComponent('JRD Companies - ' + (data.topic || 'Inquiry'));
      const body = encodeURIComponent(
        'Name: ' + data.name + '\nEmail: ' + data.email + '\nTopic: ' + (data.topic || 'General') + '\n\nMessage:\n' + (data.message || '(none)')
      );

      status.style.display = 'block';
      setTimeout(function() {
        window.location.href = 'mailto:info@jrdcompanies.com?subject=' + subject + '&body=' + body;
      }, 350);

      return false;
    }

    /* =========================
       Auto Hours Status (Durand)
       Mon-Fri 7:30-17:30
       ========================= */
    function updateAutoHoursStatus(){
      const dot = document.getElementById('autoDot');
      const text = document.getElementById('autoStatusText');
      if (!dot || !text) return;

      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      const min = now.getMinutes();
      const t = hour + (min / 60);

      const isOpen = (day >= 1 && day <= 5 && t >= 7.5 && t < 17.5);

      if (isOpen){
        const remaining = 17.5 - t;
        const hrs = Math.floor(remaining);
        const mins = Math.round((remaining - hrs) * 60);
        dot.classList.remove('closed');
        text.textContent = 'Open - Closes in ' + hrs + 'h ' + mins + 'm';
      } else {
        dot.classList.add('closed');

        let next = 'Mon 7:30 AM';
        if (day >= 1 && day <= 4 && t >= 17.5) next = 'Tomorrow 7:30 AM';
        if (day >= 1 && day <= 4 && t < 7.5) next = 'Today 7:30 AM';
        if (day === 5 && t >= 17.5) next = 'Mon 7:30 AM';
        if (day === 6) next = 'Mon 7:30 AM';
        if (day === 0) next = 'Mon 7:30 AM';

        text.textContent = 'Closed - Opens ' + next;
      }
    }

    /* =========================
       Ticker (static demo values)
       ========================= */
    const TICKER_ITEMS = [
      { symbol:'WTI',   label:'Crude',      price:71.24,  change: 1.32 },
      { symbol:'BRENT', label:'Brent',      price:74.89,  change: 0.87 },
      { symbol:'RBOB',  label:'Gas Futures',price:2.134,  change:-0.024 },
      { symbol:'HO',    label:'Heating Oil',price:2.287,  change: 0.031 },
      { symbol:'NAT',   label:'Nat Gas',    price:3.142,  change:-0.089 },
      { symbol:'XOM',   label:'Exxon',      price:113.45, change: 1.56 },
      { symbol:'CVX',   label:'Chevron',    price:148.92, change: 2.18 },
      { symbol:'XLE',   label:'Energy ETF', price:89.67,  change: 0.94 }
    ];

    function renderTicker(){
      const track = document.getElementById('tickerTrack');
      if (!track) return;

      const makeBlock = function() {
        const frag = document.createDocumentFragment();
        TICKER_ITEMS.forEach(function(item) {
          const el = document.createElement('div');
          el.className = 'tick';

          const sym = document.createElement('span');
          sym.className = 'sym';
          sym.textContent = item.symbol;

          const lbl = document.createElement('span');
          lbl.className = 'lbl';
          lbl.textContent = item.label;

          const px = document.createElement('span');
          px.className = 'px';
          const isFutures = item.symbol === 'RBOB' || item.symbol === 'HO' || item.symbol === 'NAT';
          px.textContent = '$' + (isFutures ? item.price.toFixed(3) : item.price.toFixed(2));

          const chg = document.createElement('span');
          chg.className = 'chg ' + (item.change >= 0 ? 'up' : 'dn');
          chg.textContent = (item.change >= 0 ? '+' : '') + (isFutures ? item.change.toFixed(3) : item.change.toFixed(2));

          el.appendChild(sym);
          el.appendChild(lbl);
          el.appendChild(px);
          el.appendChild(chg);
          frag.appendChild(el);
        });
        return frag;
      };

      track.appendChild(makeBlock());
      track.appendChild(makeBlock());
    }

    document.getElementById('year').textContent = new Date().getFullYear();

    document.addEventListener('DOMContentLoaded', function() {
      renderTicker();
      if (sessionStorage.getItem('jrd_access') === 'granted') updateAutoHoursStatus();
      setInterval(updateAutoHoursStatus, 60 * 1000);
    });
  </script>

</body>
</html>
