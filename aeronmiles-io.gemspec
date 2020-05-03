# coding: utf-8

versions = JSON.parse(open('https://pages.github.com/versions.json').read)

Gem::Specification.new do |spec|
  spec.name          = "aeronmiles.io"
  spec.version       = "0.1.1"
  spec.authors       = ["aeron miles"]
  spec.email         = ["aeronmiles@yahoo.co.uk"]

  spec.summary       = ""
  spec.homepage      = ""
  spec.license       = ""

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_development_dependency "jekyll", versions["jekyll"]
  spec.add_development_dependency "bundler", versions["bundler"]
  spec.add_development_dependency "rake", versions["rake"]
end
