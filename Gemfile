source "https://rubygems.org"
require 'json'
require 'open-uri'
versions = JSON.parse(open('https://pages.github.com/versions.json').read)

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!

gem "jekyll" #, versions['jekyll']
gem "rake", versions['rake']

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-seo-tag", versions['jekyll-seo-tag']
  # gem 'github-pages', versions['github-pages']
  gem "jekyll-paginate", versions['jekyll-paginate']
  gem "jekyll-sitemap", versions['jekyll-sitemap']
  gem "jekyll-feed", versions['jekyll-feed']
  gem 'jekyll-assets', versions['jekyll-assets']
  gem "activesupport", versions['activesupport']
  gem "jekyll-minifier", versions['jekyll-minifier']
  gem "rouge", versions['rouge']
  gem "liquid-c"
  gem "jekyll-include-cache"
  # gem "jekyll-commonmark", versions['jekyll-commonmark']
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem 'wdm', '>= 0.1.0' if Gem.win_platform?