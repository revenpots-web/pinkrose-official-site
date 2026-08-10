const supportEmail = "pinkrose.support@gmail.com";
const subject = "?subject=%5BPink%20Rose%20%EB%AC%B8%EC%9D%98%5D";

function footer() {
  return `<footer class="site-footer"><p>© 2026 Pink Rose</p><p>Contact: <a href="mailto:${supportEmail}">${supportEmail}</a></p><nav class="footer-nav" aria-label="푸터 메뉴"><a href="/terms">이용약관</a><a href="/privacy">개인정보처리방침</a><a href="/community-guidelines">운영정책</a><a href="/delete-account">계정 삭제</a><a href="/#contact">문의하기</a></nav></footer>`;
}

function header() {
  return `<header class="site-header"><a class="wordmark" href="/">Pink Rose</a><a class="home-link" href="/">Home</a></header>`;
}

function qrCard(store, label, url) {
  const inside = `<p class="store-name">${store}</p><p class="store-label">${label}</p><div class="qr-frame ${url ? "" : "qr-placeholder"}">${url ? `<img src="https://api.qrserver.com/v1/create-qr-code/?format=svg&size=280x280&data=${encodeURIComponent(url)}" alt="${store} 다운로드 QR 코드">` : ""}</div><p class="status">${url ? "QR 코드를 스캔하거나 이 영역을 눌러 다운로드하세요." : "준비 중"}</p>`;
  return url ? `<a class="download-card is-active" href="${url}" target="_blank" rel="noreferrer">${inside}</a>` : `<div class="download-card">${inside}</div>`;
}

const policyRoutes = {
  "/terms": { title: "이용약관", file: "terms.txt", description: "Pink Rose 이용약관" },
  "/privacy": { title: "개인정보처리방침", file: "privacy.txt", description: "Pink Rose 개인정보처리방침" },
  "/community-guidelines": { title: "운영정책", file: "community-guidelines.txt", description: "Pink Rose 운영정책" }
};

function updatePolicyMetadata(policy) {
  document.title = `${policy.title} | Pink Rose`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", policy.description);
  document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://pinkrose.kr${location.pathname}`);
}

async function policyPage(main, policy) {
  updatePolicyMetadata(policy);
  main.innerHTML = `<div class="document-heading"><p class="eyebrow">Pink Rose Official</p><h1>${policy.title}</h1></div><pre id="policy-content" class="policy-text"></pre>`;
  main.insertAdjacentHTML("beforebegin", header());
  const output = main.querySelector("#policy-content");
  try { output.textContent = await (await fetch(`/${policy.file}`)).text(); } catch { output.textContent = "정책 문서를 불러오지 못했습니다."; }
  main.insertAdjacentHTML("afterend", footer());
}

function homePage(main) {
  const config = window.PINK_ROSE_CONFIG || {};
  main.innerHTML = `<section class="hero" aria-labelledby="site-title"><div class="hero-copy"><img class="brand-image" src="/pink-rose-logo.png" alt="Pink Rose"><p class="eyebrow">Pink Rose Official</p><h1 id="site-title">Pink Rose</h1><p class="lead">Pink Rose는 성인 이용자를 위한 커뮤니티 서비스입니다.<br>아래에서 서비스 이용약관과 정책을 확인하실 수 있습니다.</p></div></section><section class="section" aria-labelledby="policies-title"><div class="section-heading"><p class="eyebrow">Policies</p><h2 id="policies-title">서비스 정책</h2></div><nav class="policy-links" aria-label="정책 문서"><a href="/terms" class="policy-card"><span>이용약관</span><span aria-hidden="true">›</span></a><a href="/privacy" class="policy-card"><span>개인정보처리방침</span><span aria-hidden="true">›</span></a><a href="/community-guidelines" class="policy-card"><span>운영정책</span><span aria-hidden="true">›</span></a><a href="/delete-account" class="policy-card"><span>계정 삭제</span><span aria-hidden="true">›</span></a></nav></section><section class="section" aria-labelledby="download-title"><div class="section-heading"><p class="eyebrow">Download</p><h2 id="download-title">앱 다운로드</h2></div><div class="download-grid">${qrCard("Google Play","Google Play에서 다운로드",config.GOOGLE_PLAY_URL)}${qrCard("Apple App Store","App Store에서 다운로드",config.APPLE_APP_STORE_URL)}</div></section><section class="section contact" id="contact" aria-labelledby="contact-title"><div class="section-heading"><p class="eyebrow">Contact</p><h2 id="contact-title">문의하기</h2></div><p>문의 이메일</p><p class="email-address"><a href="mailto:${supportEmail}">${supportEmail}</a></p><a class="button" href="mailto:${supportEmail}${subject}">이메일로 문의하기</a></section>${footer()}`;
}

const main = document.querySelector("main");
const path = location.pathname.replace(/\/$/, "") || "/";
if (main && policyRoutes[path]) policyPage(main, policyRoutes[path]); else if (main) homePage(main);
