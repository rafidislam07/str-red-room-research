# STR Search research dashboard

The `site` directory contains the cleaned static research presentation, current
comparison data and referenced photos. It offers no file downloads.
Research updated October 27, 2026. Historical reports and working datasets are excluded.

## Local preview

```sh
python -m http.server 8769 --directory site
```

Open http://localhost:8769. No package installation or build is required.

## GitHub Pages

After confirming the intended audience, select **GitHub Actions** under
Settings → Pages. Run **Publish research dashboard** manually from Actions.
The workflow publishes only `site`, without including repository metadata.
It does not publish automatically on push.

GitHub Pages visibility must be checked separately from repository visibility:
a private repository does not by itself guarantee a private website.

Revenue Potential represents modeled estimates. Observed comparisons do not
establish a causal effect of the adult theme. See the presentation for sample
sizes, comparability limitations, and source listing links.
