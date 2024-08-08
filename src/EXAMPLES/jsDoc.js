
export {}


{
  // Js Doc TYPEDEF
  /**
   * @typedef CompilerOptions
   * @prop {boolean} [strict]
   * @prop {string} [outDir]
   */
  /**
   * @typedef ConfigSettings
   * @prop {CompilerOptions} [compilerOptions]
   * @prop {string | string[]} [extends]
   */


// Js Doc SATISFIES
  /**
   * @satisfies {ConfigSettings}
   */
  let myConfigSettings = {
    compilerOptions: {
      strict: true,
      outDir: "../lib",
    },
    extends: [
      "@tsconfig/strictest/tsconfig.json",
      "../../../tsconfig.base.json"
    ],
  }
  let inheritedConfigs = myConfigSettings.extends.map(it=>it)
  
  
  /**
   * @param {CompilerOptions} code
   */
  function compileCode(code){}
  
  compileCode(
    /** @satisfies {CompilerOptions} */ ({
      // ...
    })
  )
}




{
  // Js Doc OVERLOAD
  
  /**
   * @overload
   * @param {string} value
   * @return {void}
   */
  /**
   * @overload
   * @param {number} value
   * @param {number} [maximumFractionDigits]
   * @return {void}
   */
  /**
   * @param {string | number} value
   * @param {number} [maximumFractionDigits]
   */
  function printValue(value, maximumFractionDigits) {
    if (typeof value === "number") {
      const formatter = Intl.NumberFormat("en-US", {
        maximumFractionDigits,
      })
      value = formatter.format(value)
    }
    console.log(value)
  }
}



{
  // Js Doc IMPORT TYPE
  
  /**
   * @param {import("./justTypes.ts").JustAType} param
   */
  function f(param) {}
}