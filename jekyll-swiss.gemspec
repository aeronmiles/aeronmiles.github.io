# coding: utf-8

versions = JSON.parse(open('https://pages.github.com/versions.json').read)
Gem::Specification.new do |spec|
  spec.name          = "jekyll-swiss"
  spec.version       = "1.0.0"
  spec.authors       = ["broccolini"]
  spec.email         = ["diana.mounter@gmail.com"]

  spec.summary       = %q{A bold typographic theme for Jekyll, inspired by Swiss design.}
  spec.homepage      = "http://broccolini.net/swiss"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_development_dependency "jekyll", versions["jekyll"]
  spec.add_development_dependency "bundler", versions["bundler"]
  spec.add_development_dependency "rake", versions["rake"]
end
