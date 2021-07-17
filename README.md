# 낸내 폰트 파일 저장소

[낸내](https://github.com/naen-nae/naen-nae) 서비스에서 제공하고 있는 폰트 파일 저장소입니다.

GitHub Actions의 Size Limit Policy로 인해 어쩔 수 없이 Git Hooks(`pre-commit`)를 이용해 Local에서 Commit 시

- `font-face` CSS
- Subset 폰트 파일
- Subset 폰트 파일에 대한 `font-face` CSS 파일

을 생성 및 `git add` 하도록 하고 있어요.

`files` 디렉터리에 변경 사항이 생길 경우, 커밋 시 [`buildFiles.js`](./scripts/buildFiles.js) 스크립트가 `pre-commit`에 의해 실행되며, 이를 우회하고자 하는 경우 아래와 같이 `-n` 또는 `--no-verify` 옵션을 이용해주세요.

```sh
git commit -m "some changes" -n
```

감사합니다.
