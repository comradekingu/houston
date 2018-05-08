/**
 * houston/src/lib/service/type.ts
 * A bunch of interfaces to abstract away third party services
 */

export interface ICodeRepository {
  /**
   * The code repository URL
   *
   * @var {String}
   */
  url: string,

  /**
   * The default RDNN of the given code repository. This _can_ be changed in the
   * database, but we use _this_ string to get a sane default.
   *
   * @var {String}
   */
  rdnn: string,

  /**
   * Clones a repository of code to the given path.
   *
   * @async
   * @param {String} p Full path to clone the code to
   * @param {String} [reference] An optional reference to clone
   * @return {void}
   */
  clone: (p: string, reference?: string) => Promise<void>

  /**
   * Returns a list of references this repo has. In the case of git, this is
   * a list of full references like `refs/heads/master`
   *
   * @async
   * @return {String[]}
   */
  references: () => Promise<string[]>
}

export interface IPackageRepository {
  /**
   * Takes a full path to file and uploads it to a package repository
   *
   * @async
   * @param {String} p The full path to the asset
   * @param {String} name The human readable name of the file
   * @param {String} [description] A human readable description of the file
   * @param {String} [reference] A code-repository reference that this file was from
   * @return {void}
   */
  uploadPackage: (p: string, name: string, description?: string, reference?: string) => Promise<void>
}
