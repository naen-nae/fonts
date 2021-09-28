# 낸내 폰트 파일 저장소

[낸내](https://github.com/naen-nae/naen-nae) 서비스에서 제공하고 있는 폰트 파일 저장소입니다.

`yarn commit-fonts` 명령을 통해

- `/build/css`: `font-face` CSS 파일
- `/build/subset-fonts`: Subset 폰트 파일
- `/build/subset-css`: Subset 폰트 파일에 대한 `font-face` CSS 파일

파일들을 생성하고, 이후 `git add`와 `git commit`을 하도록 하고 있어요.

### [`fonts.yml`](./fonts.yml)

폰트 파일은 `fonts.yml` 파일을 기반으로 생성 및 관리합니다.

```yml
fonts:
  - author: <폰트 제작자/제작사>
    name: <폰트 이름>
    files:
      - <폰트 파일 경로 1> # '/files' 디렉터리를 베이스로 합니다.
      - <폰트 파일 경로 2> # 같은 Font Family인 경우, 여러 폰트를 등록할 수 있습니다.
    fontWeights:
      - <폰트 굵기 1> # 100~900 중에서 설정합니다.
      - <폰트 굵기 2> # 각 파일에 대한 굵기를 명시합니다.
    fontFamily: <Font Family 이름>
    licenseSummary: # 라이선스 요약
      print: true # true: 허용, false: 비허용
      website: true
      video: true
      paper: true
      embeding: true
      bici: true
      ofl: true
    license: |
      <라이선스 전문>

  - author: # ...
```

'라이선스 요약'에 대한 내용은 다음과 같습니다.

- 인쇄: 브로슈어, 포스터, 책, 잡지 및 출판용 인쇄물 등
- 웹사이트: 웹페이지, 광고 배너, 메일, E-브로슈어 등
- 영상: 영상물 자막, 영화 오프닝/엔딩 크레딧, UCC 등
- 포장지: 판매용 상품의 패키지
- 임베딩: 웹사이트 및 프로그램 서버 내 폰트 탑재, E-book 제작
- BI/CI: 회사명, 브랜드명, 상품명, 로고, 마크, 슬로건, 캐치프레이즈
- OFL: 폰트 파일의 수정/ 복제/ 배포 가능. 단, 폰트 파일의 유료 판매는 금지

## 📜 라이선스

낸내에서 소개되는 모든 폰트의 지적재산권을 포함한 모든 권리는 각 폰트 제작자/제작사에 있으며, 낸내는 오로지 한글 폰트를 소개하고 이를 웹에서 바로 사용할 수 있도록 제공하고 있습니다.

낸내를 구성하는 모든 코드는 MIT 라이선스를 따르고 있습니다.

[낸내 라이선스 전문](./LICENSE)
