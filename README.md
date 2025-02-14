# Page Speed Insights — A GitHub Action 🏎

This action utilizes [Google's Page Speed Insights](https://developers.google.com/speed/docs/insights/v5/about) to generate a report on your website's performance

<p align="center"><img src="https://raw.githubusercontent.com/JakePartusch/psi-action/master/screenshots/screenshot-output.png" alt="Example command line output" width="600"></p>

## Inputs

### `url`

**Required** The name of the site to reach `https://google.com`

### `urls`

**Optional** The name of the site to reach `https://google.com,https://yahoo.com`

### `key`

Optional - API key (recommended for production) to use when consuming the Page Speed Insights API. This should be stored as a [Github Secret](https://docs.github.com/en/actions/reference/encrypted-secrets). You can request a key [here](https://developers.google.com/speed/docs/insights/v5/get-started)

### `strategy`

Optional — Strategy to use when analyzing the page (mobile/desktop).

### `threshold`

Optional — Score to pass the PageSpeed test. Useful for setting a performance budget (default 70).

## Example usage

Basic Usage

```yaml
steps:
  - name: Running Page Speed Insights
    uses: jakepartusch/psi-action@v1.2
    id: psi
    with:
      url: "https://jake.partus.ch"
      urls: "https://jake.partus.ch,https://google.com"
      threshold: 70
      strategy: mobile
      key: ${{ secrets.APIKEY }}
```
