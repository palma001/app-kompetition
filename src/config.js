const config = {
  ipSocket: 'http://127.0.0.1:5000/',
  ipServidor: 'http://127.0.0.1:5000/',
  /**
   * View General Screen
   */
  configGeneralScreen: {
    img: {
      img: true,
      static: true,
      nameFielStatic: 'statics'
    },
    titleTeam: false
  },
  /**
   * View Moderator
   */
  moderator: {
    bonus: false,
    /**
     * When bonus if is false
     */
    buttonsNext: {
      bonus: false,
      next: false
    },
    buttonsBonus: {
      bonus: true,
      next: false
    }
    /**
     * When bonus if is true
     */

    // buttonsNext: {
    //   bonus: false,
    //   next: true
    // },
    // buttonsBonus: {
    //   bonus: true,
    //   next: false
    // }
  }
}
export default config
