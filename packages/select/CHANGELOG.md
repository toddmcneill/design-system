# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [3.0.9](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.8...@pluralsight/ps-design-system-select@3.0.9) (2021-05-26)


### Bug Fixes

* **select:** set correct peer dependency on ps normalize ([4b5f5f1](https://github.com/pluralsight/design-system/commit/4b5f5f15b6ab6f1d14243a70fa1f0d10033557e7))





## [3.0.8](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.7...@pluralsight/ps-design-system-select@3.0.8) (2021-05-25)


### Bug Fixes

* **select:** fix button focus trap in useListbox ([51315ea](https://github.com/pluralsight/design-system/commit/51315ea020179446e13b989260fb70fbce8f7784))
* **select:** no need to ever focus on a document close event ([4f99b70](https://github.com/pluralsight/design-system/commit/4f99b70c95bbd4713899b790b586d6f3f80e4bf1))





## [3.0.7](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.6...@pluralsight/ps-design-system-select@3.0.7) (2021-05-24)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [3.0.6](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.5...@pluralsight/ps-design-system-select@3.0.6) (2021-05-21)


### Bug Fixes

* enter selects and closes menu ([#1760](https://github.com/pluralsight/design-system/issues/1760)) ([3f23a20](https://github.com/pluralsight/design-system/commit/3f23a209d33a126a9034995bccb5a6bbe36079ee))





## [3.0.5](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.4...@pluralsight/ps-design-system-select@3.0.5) (2021-05-20)


### Bug Fixes

* move preventDefault into key callbacks ([#1759](https://github.com/pluralsight/design-system/issues/1759)) ([21a4ba6](https://github.com/pluralsight/design-system/commit/21a4ba6f777fee97f1c1d7a50434da5cb8de6cf5))





## [3.0.4](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.3...@pluralsight/ps-design-system-select@3.0.4) (2021-05-20)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [3.0.3](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.2...@pluralsight/ps-design-system-select@3.0.3) (2021-04-30)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [3.0.2](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.1...@pluralsight/ps-design-system-select@3.0.2) (2021-04-28)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [3.0.1](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@3.0.0...@pluralsight/ps-design-system-select@3.0.1) (2021-04-28)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





# [3.0.0](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@2.0.1...@pluralsight/ps-design-system-select@3.0.0) (2021-04-20)


### Features

* **select:** add style condition to conditional exports ([ac84c8e](https://github.com/pluralsight/design-system/commit/ac84c8e35ce62d379f033ffc34717eaec20858d6))
* **select:** expose package.json in conditional exports ([a48af78](https://github.com/pluralsight/design-system/commit/a48af78a74d4a2afe0416047e85a9a8e4057a8c8))
* **typeahead:** refactor to use field and downshift ([#1706](https://github.com/pluralsight/design-system/issues/1706)) ([f4fafde](https://github.com/pluralsight/design-system/commit/f4fafde87d0fa987610881c90ab2c9965c87b07d))


### BREAKING CHANGES

* **typeahead:** value and selectedItem -> { value: React.ReactText label: React.ReactText }

* refactor(select): unifying list api
* **typeahead:** value and selectedItem -> { value: React.ReactText label: React.ReactText }

* refactor(typeahead): remove named react imports





## [2.0.1](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@2.0.0...@pluralsight/ps-design-system-select@2.0.1) (2021-04-15)


### Bug Fixes

* **select:** properly order the conditional exports in package ([c4a03b0](https://github.com/pluralsight/design-system/commit/c4a03b01bc8f3b5f09bbe34a336ef1619de77750))





# [2.0.0](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@1.0.6...@pluralsight/ps-design-system-select@2.0.0) (2021-04-14)


### Build System

* **select:** support only react 17 as peerDependency ([2269721](https://github.com/pluralsight/design-system/commit/2269721fe97d726b10c06671542dce9885df3e73))


### Code Refactoring

* **select:** add exports to package.json as alternate entry point ([dc35fb9](https://github.com/pluralsight/design-system/commit/dc35fb987aa1cf7dab7b1a84fd17ab0898f6487b))
* **select:** convert to esm ([26eef0d](https://github.com/pluralsight/design-system/commit/26eef0df6aeae96ea769d33091755bbf75956fd8))


### BREAKING CHANGES

* **select:** add exports to package.json
* **select:** support only react 17 as peerDependency
* **select:** Drop cjs; esm only; all in on tree shaking
* **select:** Remove file imports (eg, packageName/react)





## [1.0.6](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@1.0.5...@pluralsight/ps-design-system-select@1.0.6) (2021-04-05)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [1.0.5](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@1.0.4...@pluralsight/ps-design-system-select@1.0.5) (2021-04-01)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [1.0.4](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@1.0.3...@pluralsight/ps-design-system-select@1.0.4) (2021-03-31)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## [1.0.3](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@1.0.2...@pluralsight/ps-design-system-select@1.0.3) (2021-03-26)


### Bug Fixes

* **select:** dropdown zindex added ([#1691](https://github.com/pluralsight/design-system/issues/1691)) ([19b03ad](https://github.com/pluralsight/design-system/commit/19b03adbb305d3069b85a78cefd80475068b0265))





## [1.0.2](https://github.com/pluralsight/design-system/compare/@pluralsight/ps-design-system-select@1.0.1...@pluralsight/ps-design-system-select@1.0.2) (2021-03-23)

**Note:** Version bump only for package @pluralsight/ps-design-system-select





## 1.0.1 (2021-03-17)

**Note:** Version bump only for package @pluralsight/ps-design-system-select
