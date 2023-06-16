window.__require = (function t(e, i, n) {
  function o(s, c) {
    if (!i[s]) {
      if (!e[s]) {
        var r = s.split("/");
        if (((r = r[r.length - 1]), !e[r])) {
          var h = "function" == typeof __require && __require;
          if (!c && h) return h(r, !0);
          if (a) return a(r, !0);
          throw new Error("Cannot find module '" + s + "'");
        }
      }
      var d = (i[s] = { exports: {} });
      e[s][0].call(
        d.exports,
        function (t) {
          return o(e[s][1][t] || t);
        },
        d,
        d.exports,
        t,
        e,
        i,
        n
      );
    }
    return i[s].exports;
  }
  for (
    var a = "function" == typeof __require && __require, s = 0;
    s < n.length;
    s++
  )
    o(n[s]);
  return o;
})(
  {
    AngryBirds: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "b26d1RXmcpEWql+3/CZsKe9", "AngryBirds");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            chedo: { default: [], type: cc.Toggle },
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ angrybird: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              angrybird: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ angrybird: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo),
              t.eventData && cc.RedT.dialog.EventAngryBird.onData(t.eventData);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ angrybird: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
          onClickEvent: function () {
            cc.RedT.dialog.showEventAngribird();
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    BankNap_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "56af7uc7RFDbqjkgo+Pt5dH", "BankNap_item");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            bg: cc.Node,
            gd: cc.Label,
            time: cc.Label,
            nick: cc.Label,
            bank: cc.Label,
            money: cc.Label,
            hinhthuc: cc.Label,
            status: cc.Label,
          },
          init: function (t, e) {
            (this.data = e),
              (this.bg.active = t % 2),
              (this.gd.string = e.GD),
              (this.time.string = n.getStringDateByTime(e.time)),
              (this.nick.string = e.nick),
              (this.bank.string = e.bank.toUpperCase()),
              (this.money.string = n.numberWithCommas(e.money)),
              (this.hinhthuc.string =
                "1" == e.hinhthuc
                  ? "Internet Banking"
                  : "2" == e.hinhthuc
                  ? "ATM"
                  : "Qu\u1ea7y giao d\u1ecbch"),
              (this.status.string =
                0 == e.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == e.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ea5t b\u1ea1i"),
              (this.status.node.color =
                0 == e.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == e.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          updateStatus: function (t) {
            (this.status.string =
              0 == t
                ? "Ch\u1edd duy\u1ec7t"
                : 1 == t
                ? "Th\xe0nh c\xf4ng"
                : "Th\u1ea5t b\u1ea1i"),
              (this.status.node.color =
                0 == t
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          onInfoClick: function () {
            cc.RedT.dialog.showBank(event, "nap", this);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    BankNap: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "1f0a0NMW1pP6JIkfgthDDUW", "BankNap"),
          cc.Class({
            extends: cc.Component,
            properties: {
              content: cc.Node,
              pages: cc.Prefab,
              status: "",
              find: "",
            },
            onLoad: function () {
              var t = this;
              (this.pages = cc.instantiate(this.pages)),
                (this.pages.y = -315),
                (this.pages.active = !1),
                this.node.addChild(this.pages),
                (this.pages = this.pages.getComponent("Pagination")),
                this.pages.init(this),
                Promise.all(
                  this.content.children.map(function (t) {
                    return t.getComponent("BankNap_item");
                  })
                ).then(function (e) {
                  t.content = e;
                });
            },
            onEnable: function () {
              this.get_data();
            },
            changerStatus: function (t, e) {
              this.status !== e && ((this.status = e), this.get_data());
            },
            get_data: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1;
              this.find
                ? cc.RedT.send({
                    shop: {
                      bank: {
                        nap: { status: this.status, find: this.find, page: t },
                      },
                    },
                  })
                : cc.RedT.send({
                    shop: { bank: { nap: { status: this.status, page: t } } },
                  });
            },
            onData: function (t) {
              this.pages.onSet(t.page, t.kmess, t.total),
                Promise.all(
                  this.content.map(function (e, i) {
                    var n = t.data[i];
                    void 0 !== n
                      ? (e.init(i, n), (e.node.active = !0))
                      : (e.node.active = !1);
                  })
                );
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    BankRut_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f00700WxHBJ047KTeo8p9rf", "BankRut_item");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            bg: cc.Node,
            gd: cc.Label,
            time: cc.Label,
            nick: cc.Label,
            bank: cc.Label,
            money: cc.Label,
            status: cc.Label,
          },
          init: function (t, e, i) {
            (this.RedT = i),
              (this.data = e),
              (this.bg.active = t % 2),
              (this.gd.string = e.GD),
              (this.time.string = n.getStringDateByTime(e.time)),
              (this.nick.string = e.nick),
              (this.bank.string = e.bank.toUpperCase()),
              (this.money.string = n.numberWithCommas(e.money)),
              (this.status.string =
                0 == e.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == e.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ea5t b\u1ea1i"),
              (this.status.node.color =
                0 == e.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == e.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          onInfoClick: function () {
            (this.RedT.item = this),
              cc.RedT.dialog.showBank(event, "rut", this);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    BankRut: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "d1d6cxIN0ZE4pUPdOukJPJH", "BankRut"),
          cc.Class({
            extends: cc.Component,
            properties: {
              content: cc.Node,
              pages: cc.Prefab,
              status: "",
              find: "",
            },
            onLoad: function () {
              var t = this;
              (this.item = null),
                (this.pages = cc.instantiate(this.pages)),
                (this.pages.y = -315),
                (this.pages.active = !1),
                this.node.addChild(this.pages),
                (this.pages = this.pages.getComponent("Pagination")),
                this.pages.init(this),
                Promise.all(
                  this.content.children.map(function (t) {
                    return t.getComponent("BankRut_item");
                  })
                ).then(function (e) {
                  t.content = e;
                });
            },
            onEnable: function () {
              this.get_data();
            },
            changerStatus: function (t, e) {
              this.status !== e && ((this.status = e), this.get_data());
            },
            get_data: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1;
              this.find
                ? cc.RedT.send({
                    shop: {
                      bank: {
                        rut: { find: this.find, status: this.status, page: t },
                      },
                    },
                  })
                : cc.RedT.send({
                    shop: { bank: { rut: { status: this.status, page: t } } },
                  });
            },
            onData: function (t) {
              var e = this;
              this.pages.onSet(t.page, t.kmess, t.total),
                Promise.all(
                  this.content.map(function (i, n) {
                    var o = t.data[n];
                    void 0 !== o
                      ? (i.init(n, o, e), (i.node.active = !0))
                      : (i.node.active = !1);
                  })
                );
            },
            remove: function () {
              this.item.node.active = !1;
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    BaseGame: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0809dS9RORFkavLDAxy4ZaU", "BaseGame"),
          (e.exports = {
            IS_LOGIN: !1,
            isConnected: !1,
            _socket: null,
            connect: function (t) {
              var e =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : "/",
                i =
                  arguments.length > 2 &&
                  void 0 !== arguments[2] &&
                  arguments[2];
              arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
              this.isConnected ||
                ((this._socket = new WebSocket(
                  "ws://" + t + (i ? ":" + i : "") + e
                )),
                (this._socket.onopen = this._onSocketConnect),
                (this._socket.onclose = this._onSocketDisconnect),
                (this._socket.onmessage = this._onSocketData),
                (this._socket.onerror = this._onSocketError),
                (this.isConnected = !0));
            },
            disconnect: function () {
              (this.isConnected = !1), this._socket.close();
            },
            send: function (t) {
              try {
                this._socket.send(this._encodeMessage(t));
              } catch (t) {
                (this.inGame.loading.active = !1),
                  this.inGame.notice.show({
                    title: "TH\xd4NG B\xc1O",
                    text: "KH\xd4NG th\u1ec3 k\u1ebft n\u1ed1i t\u1edbi m\xe1y ch\u1ee7...",
                  });
              }
            },
            _decodeMessage: function (t) {
              return JSON.parse(t);
            },
            _encodeMessage: function (t) {
              return JSON.stringify(t);
            },
            _onSocketConnect: function () {
              cc.RedT.isConnected = !0;
            },
            _onSocketDisconnect: function () {
              (cc.RedT.isConnected = !1),
                cc.RedT.IS_LOGIN
                  ? cc.RedT.inGame.signOut()
                  : cc.RedT.inGame.dialog.onCloseDialog(),
                cc.RedT.reconnect();
            },
            _onSocketData: function (t) {
              var e = t.data;
              (e = cc.RedT._decodeMessage(e)), cc.RedT.inGame.onData(e);
            },
            _onSocketError: function (t) {},
            reconnect: function () {
              this.connect("127.0.0.1", "/adminsocket", !1, !0);
            },
            init: function () {
              this.initPrototype();
            },
            initPrototype: function () {
              String.format ||
                (String.format = function (t) {
                  var e = Array.prototype.slice.call(arguments, 1);
                  return t.replace(/{(\d+)}/g, function (t, i) {
                    return void 0 !== e[i] ? e[i] : t;
                  });
                });
            },
            setAutoLogin: function (t) {
              localStorage.setItem("AUTO_LOGIN", t);
            },
            isAutoLogin: function () {
              return "true" == localStorage.getItem("AUTO_LOGIN");
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    BauCua_cuoc_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "760d1PHyHVCZZARl0t/EgVJ", "BauCua_cuoc_item"),
          cc.Class({
            extends: cc.Component,
            properties: { username: cc.Label, cuoc: cc.Label },
          }),
          cc._RF.pop();
      },
      {},
    ],
    BauCua_inGame: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ed166hrvcRKE5mOaBORsnBz", "BauCua_inGame");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            huouRed: cc.Node,
            bauRed: cc.Node,
            gaRed: cc.Node,
            caRed: cc.Node,
            cuaRed: cc.Node,
            tomRed: cc.Node,
            prefabCuoc: cc.Prefab,
          },
          onData: function (t) {
            this.resetData();
            var e = this;
            Promise.all(
              t.map(function (t) {
                var i;
                t[0] > 0 &&
                  (((i = (i = cc.instantiate(e.prefabCuoc)).getComponent(
                    "BauCua_cuoc_item"
                  )).username.string = t.name),
                  (i.cuoc.string = n.numberWithCommas(t[0])),
                  e.huouRed.addChild(i.node));
                t[1] > 0 &&
                  (((i = (i = cc.instantiate(e.prefabCuoc)).getComponent(
                    "BauCua_cuoc_item"
                  )).username.string = t.name),
                  (i.cuoc.string = n.numberWithCommas(t[1])),
                  e.bauRed.addChild(i.node));
                t[2] > 0 &&
                  (((i = (i = cc.instantiate(e.prefabCuoc)).getComponent(
                    "BauCua_cuoc_item"
                  )).username.string = t.name),
                  (i.cuoc.string = n.numberWithCommas(t[2])),
                  e.gaRed.addChild(i.node));
                t[3] > 0 &&
                  (((i = (i = cc.instantiate(e.prefabCuoc)).getComponent(
                    "BauCua_cuoc_item"
                  )).username.string = t.name),
                  (i.cuoc.string = n.numberWithCommas(t[3])),
                  e.caRed.addChild(i.node));
                t[4] > 0 &&
                  (((i = (i = cc.instantiate(e.prefabCuoc)).getComponent(
                    "BauCua_cuoc_item"
                  )).username.string = t.name),
                  (i.cuoc.string = n.numberWithCommas(t[4])),
                  e.cuaRed.addChild(i.node));
                t[5] > 0 &&
                  (((i = (i = cc.instantiate(e.prefabCuoc)).getComponent(
                    "BauCua_cuoc_item"
                  )).username.string = t.name),
                  (i.cuoc.string = n.numberWithCommas(t[5])),
                  e.tomRed.addChild(i.node));
              })
            );
          },
          resetData: function () {
            this.huouRed.removeAllChildren(),
              this.bauRed.removeAllChildren(),
              this.gaRed.removeAllChildren(),
              this.caRed.removeAllChildren(),
              this.cuaRed.removeAllChildren(),
              this.tomRed.removeAllChildren();
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    BauCua: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "94d22BZP0xBK4mI/0cCCHW0", "BauCua");
        var n = t("Helper"),
          o = t("BauCua_inGame");
        cc.Class({
          extends: cc.Component,
          properties: {
            inGame: o,
            iconLV: { default: [], type: cc.SpriteFrame },
            dices: { default: [], type: cc.Sprite },
            red: { default: [], type: cc.Label },
            nodeTime: cc.Label,
            nodeSetDice: cc.Node,
            selectDice: "",
            get_new: !1,
          },
          onLoad: function () {
            Promise.all(
              this.dices.map(function (t) {
                t.isSet = !1;
              })
            );
          },
          onEnable: function () {
            cc.RedT.send({
              baucua: this.get_new ? { view: !0 } : { get_new: !0, view: !0 },
            });
          },
          onDisable: function () {
            cc.RedT.send({ baucua: { view: !1 } });
          },
          onClickDice: function (t, e) {
            this.nodeSetDice.active && this.selectDice == e
              ? (this.nodeSetDice.active = !1)
              : (this.nodeSetDice.active = !0),
              (this.nodeSetDice.x = t.target.x + 3),
              (this.nodeSetDice.y = t.target.y + 75),
              (this.selectDice = e);
          },
          onSelectLinhVat: function (t, e) {
            (this.nodeSetDice.active = !1),
              (this.dices[this.selectDice].spriteFrame = this.iconLV[e]),
              (this.dices[this.selectDice].isSet = !0);
            var i = {};
            (i[this.selectDice] = e), cc.RedT.send({ baucua: { set_dice: i } });
          },
          onDice: function (t) {
            var e = this;
            Promise.all(
              t.map(function (t, i) {
                e.dices[i].spriteFrame = e.iconLV[t];
              })
            );
          },
          onData: function (t) {
            void 0 !== t.time_remain &&
              ((this.get_new = !0),
              (this.time_remain = t.time_remain),
              this.playTime()),
              void 0 !== t.dices && this.onDice(t.dices),
              void 0 !== t.info && this.onInfo(t.info),
              void 0 !== t.finish &&
                this.get_new &&
                ((this.time_remain = 72),
                this.playTime(),
                (this.nodeSetDice.active = !1),
                Promise.all(
                  this.dices.map(function (t) {
                    t.isSet = !1;
                  })
                )),
              void 0 !== t.ingame && this.inGame.onData(t.ingame);
          },
          playTime: function () {
            void 0 !== this.timeInterval && clearInterval(this.timeInterval),
              (this.timeInterval = setInterval(
                function () {
                  if (this.time_remain > 61) {
                    var t = n.numberPad(this.time_remain - 62, 2);
                    (this.nodeTime.node.color = cc.Color.RED),
                      (this.nodeTime.string = n.numberPad(t, 2));
                  } else if (
                    (61 == this.time_remain && this.resetDice(),
                    this.time_remain > 0)
                  ) {
                    t = n.numberPad(this.time_remain - 1, 2);
                    (this.nodeTime.string = t),
                      (this.nodeTime.node.color = cc.Color.WHITE);
                  } else clearInterval(this.timeInterval);
                  this.time_remain--;
                }.bind(this),
                1e3
              ));
          },
          resetDice: function () {
            var t = this;
            Promise.all(
              this.dices.map(function (e) {
                e.isSet || (e.spriteFrame = t.iconLV[6]);
              })
            );
          },
          setLogout: function () {
            (this.get_new = !1), clearInterval(this.timeInterval);
          },
          onInfo: function (t) {
            (this.red[0].string = n.nFormatter(t.redHuou, 1)),
              (this.red[1].string = n.nFormatter(t.redBau, 1)),
              (this.red[2].string = n.nFormatter(t.redGa, 1)),
              (this.red[3].string = n.nFormatter(t.redCa, 1)),
              (this.red[4].string = n.nFormatter(t.redCua, 1)),
              (this.red[5].string = n.nFormatter(t.redTom, 1));
          },
          onResetTop: function () {
            cc.RedT.send({ baucua: { resetTop: !0 } });
          },
        }),
          cc._RF.pop();
      },
      { BauCua_inGame: "BauCua_inGame", Helper: "Helper" },
    ],
    BigBabol_item_top: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "71cd7LcuUhCF523aMCrq4CU", "BigBabol_item_top");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            username: cc.Label,
            redPlay: cc.Label,
            redWin: cc.Label,
            redLost: cc.Label,
            redLai: cc.Label,
            LastTime: cc.Label,
            LastBet: cc.Label,
          },
          setData: function (t) {
            (this.username.string = void 0 !== t.name ? t.name : ""),
              (this.redPlay.string = n.numberWithCommas(t.bet)),
              (this.redWin.string = n.numberWithCommas(t.win)),
              (this.redLost.string = n.numberWithCommas(t.lost)),
              (this.redLai.string = n.numberWithCommas(t.totall)),
              (this.LastTime.string =
                void 0 !== t.time ? n.getStringDateByTime(t.time) : ""),
              (this.LastBet.string =
                void 0 !== t.select ? n.numberWithCommas(t.select) : "");
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    BigBabol: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f5f4eqIlJNIPoUTBWDHul3r", "BigBabol");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            chedo: { default: [], type: cc.Toggle },
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ big_babol: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              big_babol: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ big_babol: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo),
              t.eventData && cc.RedT.dialog.EventBigBabol.onData(t.eventData);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ big_babol: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
          onClickEvent: function () {
            cc.RedT.dialog.showEventBigBabol();
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    BrowserUtil: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3144b0EOb5M+JRv7V+30M1S", "BrowserUtil"),
          (e.exports = {
            showCursorText: function () {
              this.isCursorAuto() || this.setCursor("text");
            },
            showCursorPointer: function () {
              this.isCursorAuto() || this.setCursor("pointer");
            },
            showCursorMove: function () {
              this.isCursorAuto() || this.setCursor("move");
            },
            showCursorAuto: function () {
              this.isCursorAuto() || this.setCursor("auto");
            },
            showCursorShoot: function () {
              cc.sys.isBrowser &&
                (document.getElementById("GameDiv").style.cursor =
                  "url('cursors/cursor-shot.png') 5 2, auto");
            },
            showCursorAutoForce: function () {
              cc.sys.isBrowser && this.setCursor("auto");
            },
            isCursorAuto: function () {
              return (
                !!cc.sys.isBrowser &&
                "auto" === document.getElementById("GameDiv").style.cursor
              );
            },
            setCursor: function (t) {
              cc.sys.isBrowser && (document.body.style.cursor = t);
            },
            showTooltip: function (t) {
              cc.sys.isBrowser && (document.body.title = t);
            },
            focusGame: function () {
              cc.sys.isBrowser &&
                document.getElementsByTagName("canvas")[0].focus();
            },
            getHTMLElementByEditBox: function (t) {
              return t._impl._elem;
            },
            checkEditBoxFocus: function (t) {
              return t.isFocused();
            },
            focusEditBox: function (t) {
              t._impl._elem.focus(), t.focus();
            },
            unFocusEditBox: function (t) {},
            inputAddEvent: function (t, e, i) {
              t._impl._elem.addEventListener(e, i);
            },
            inputRemoveEvent: function (t, e, i) {
              t._impl._elem.removeEventListener(e, i);
            },
            readOnlyEditBox: function (t) {
              t.readOnly = !0;
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Candy: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "09d2bKalLJKZo45cj2DCqJz", "Candy");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            chedo: { default: [], type: cc.Toggle },
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
            red: !0,
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ candy: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              candy: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ candy: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ candy: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    ChuyenRed_daily: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "c1af2XufuNBepY7+fdeCQxa", "ChuyenRed_daily"),
          cc.Class({
            extends: cc.Component,
            properties: {
              STT: { default: null, type: cc.Label },
              DaiLy: { default: null, type: cc.Label },
              NICKNAME: { default: null, type: cc.Label },
              Phone: { default: null, type: cc.Label },
              FB: "",
            },
            init: function (t, e) {
              this.controll = t;
            },
            onChuyenClick: function () {
              cc.RedT.audio.playClick(), this.controll.selectDaiLy(this);
            },
            onFBClick: function () {
              window.open(this.FB, "_blank");
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    ChuyenRed: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "45856xdHLFHNqyaZPpjF/pA", "ChuyenRed"),
          cc.Class({
            extends: cc.Component,
            properties: {
              header: { default: null, type: cc.Node },
              body: { default: null, type: cc.Node },
              nickname: { default: null, type: cc.EditBox },
              renickname: { default: null, type: cc.EditBox },
              red: { default: null, type: cc.EditBox },
              messenger: { default: null, type: cc.EditBox },
              otp: { default: null, type: cc.EditBox },
              rednhan: { default: null, type: cc.Label },
              scrollview: { default: null, type: cc.ScrollView },
            },
            init: function () {
              var t = this,
                e = this;
              (this.isLoaded = !1),
                (this.editboxs = [this.SoThe, this.SoSeri]),
                (this.keyHandle = function (t) {
                  return t.keyCode === cc.macro.KEY.tab
                    ? (e.isTop() && e.changeNextFocusEditBox(),
                      t.preventDefault && t.preventDefault(),
                      !1)
                    : t.keyCode === cc.macro.KEY.enter
                    ? (BrowserUtil.focusGame(),
                      e.onNapClick(),
                      t.preventDefault && t.preventDefault(),
                      !1)
                    : void 0;
                }),
                Promise.all(
                  this.header.children.map(function (t) {
                    return t.getComponent("itemContentMenu");
                  })
                ).then(function (e) {
                  t.header = e;
                });
            },
            onSelectHead: function (t, e) {
              Promise.all(
                this.header.map(function (t) {
                  t.node.name == e ? t.select() : t.unselect();
                })
              ),
                Promise.all(
                  this.body.children.map(function (t) {
                    t.name == e ? (t.active = !0) : (t.active = !1);
                  })
                );
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Config: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "05c18T81bpMJoySqeB29I5A", "Config"),
          (e.exports = {
            HOST: "https://206.189.34.176:80",
            SOCKET: "ws://206.189.34.176:80",
          }),
          cc._RF.pop();
      },
      {},
    ],
    DanhSachBank: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f29016enLdC1rnSk3a1NOX1", "DanhSachBank"),
          cc.Class({
            extends: cc.Component,
            properties: {
              scrollview: { default: null, type: cc.ScrollView },
              prefab: { default: null, type: cc.Prefab },
            },
            onEnable: function () {
              cc.RedT.send({ shop: { bank: { list: !0 } } });
            },
            dataBank: function (t) {
              if ((this.scrollview.content.destroyAllChildren(), t.length)) {
                var e = this;
                Promise.all(
                  t.map(function (t, i) {
                    var n = cc.instantiate(e.prefab);
                    n.getComponent("itemBank").init(i, t),
                      e.scrollview.content.addChild(n);
                  })
                );
              }
            },
            onData: function (t) {
              void 0 !== t.data && this.dataBank(t.data),
                void 0 !== t.remove && cc.RedT.dialog.onBack(),
                void 0 !== t.updateRut &&
                  cc.RedT.dialog.Bank.rut.onData(t.updateRut);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    DanhSachDaiLy: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "12decyffmpIlqeUqnthYijk", "DanhSachDaiLy"),
          cc.Class({
            extends: cc.Component,
            properties: {
              scrollview: { default: null, type: cc.ScrollView },
              prefab: { default: null, type: cc.Prefab },
            },
            onEnable: function () {
              cc.RedT.send({ shop: { daily: { get_data: !0 } } });
            },
            dataDaiLy: function (t) {
              if ((this.scrollview.content.destroyAllChildren(), t.length)) {
                var e = this;
                Promise.all(
                  t.map(function (t, i) {
                    var n = cc.instantiate(e.prefab);
                    n.getComponent("itemDaiLy").init(i, t),
                      e.scrollview.content.addChild(n);
                  })
                );
              }
            },
            onData: function (t) {
              void 0 !== t.data && this.dataDaiLy(t.data),
                void 0 !== t.remove && cc.RedT.dialog.onBack();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    DanhSachTranDau: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "248d7cAJt5DRZhxJtTUop0N", "DanhSachTranDau"),
          cc.Class({
            extends: cc.Component,
            properties: {
              scrollview: { default: null, type: cc.ScrollView },
              prefab: { default: null, type: cc.Prefab },
            },
            onEnable: function () {
              cc.RedT.send({ bongda: { get_data: !0 } });
            },
            dataTranDau: function (t) {
              if (
                (cc.log(t),
                this.scrollview.content.destroyAllChildren(),
                t.length)
              ) {
                var e = this;
                Promise.all(
                  t.map(function (t, i) {
                    var n = cc.instantiate(e.prefab);
                    n.getComponent("itemTranDau").init(i, t),
                      e.scrollview.content.addChild(n);
                  })
                );
              }
            },
            onData: function (t) {
              void 0 !== t.data && this.dataTranDau(t.data),
                void 0 !== t.remove && cc.RedT.dialog.onBack();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Dialog: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "25e93DvojpK6Idfq683yfCg", "Dialog");
        var n = t("dialog_GiftCode"),
          o = t("dialog_QuanLyTheCao"),
          a = t("dialog_DanhSachDaiLy"),
          s = t("dialog_DanhSachTranDau"),
          c = t("EventAngryBird"),
          r = t("EventVip"),
          h = t("EventBigBabol"),
          d = t("EventMiniPoker"),
          u = t("dialog_Bank"),
          l = t("dialog_remove"),
          m = t("HistoryTaiXiu");
        cc.Class({
          extends: cc.Component,
          properties: {
            quanLyTheCao: o,
            danhSachDaiLy: a,
            danhSachTranDau: s,
            GiftCode: n,
            EventAngryBird: c,
            EventBigBabol: h,
            EventMiniPoker: d,
            EventVip: r,
            HistoryTaiXiu: m,
            Bank: u,
            Remove: l,
          },
          init: function () {
            (this.actionShow = cc.spawn(
              cc.scaleTo(0.5, 1).easing(cc.easeBackOut(2.5)),
              cc.fadeTo(0.5, 255)
            )),
              (this.objShow = null),
              (this.objTmp = null);
          },
          onClickBack: function () {
            cc.RedT.audio.playUnClick(), this.onBack();
          },
          onBack: function () {
            null != this.objShow
              ? void 0 == this.objShow.previous || null == this.objShow.previous
                ? ((this.objShow.active = !1),
                  (this.node.active = !1),
                  (this.objShow = null))
                : ((this.objTmp = this.objShow),
                  (this.objShow = this.objShow.previous),
                  (this.objTmp.previous = null),
                  (this.objTmp.active = !1),
                  (this.objShow.active = !0),
                  (this.objTmp = null))
              : (this.node.active = !1);
          },
          onClosePrevious: function (t) {
            void 0 !== t.previous &&
              null !== t.previous &&
              (this.onClosePrevious(t.previous), (t.previous = null)),
              (t.active = !1);
          },
          onCloseDialog: function () {
            null != this.objShow
              ? void 0 == this.objShow.previous || null == this.objShow.previous
                ? ((this.objShow.active = this.node.active = !1),
                  (this.objShow = null))
                : (this.onClosePrevious(this.objShow.previous),
                  (this.objShow.active = this.node.active = !1),
                  (this.objShow.previous = null),
                  (this.objShow = null))
              : (this.node.active = !1);
          },
          resetSizeDialog: function (t) {
            t.stopAllActions(), (t.scale = 0.5), (t.opacity = 0);
          },
          showQLTheCao: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.node.active = !0),
              (this.quanLyTheCao.node.active = !0),
              (this.objShow = this.quanLyTheCao.node),
              this.quanLyTheCao.show(e, i);
          },
          showDaiLy: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.node.active = !0),
              (this.danhSachDaiLy.node.active = !0),
              (this.objShow = this.danhSachDaiLy.node),
              this.danhSachDaiLy.show(e, i);
          },
          showTranDau: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.node.active = !0),
              (this.danhSachTranDau.node.active = !0),
              (this.objShow = this.danhSachTranDau.node),
              this.danhSachTranDau.show(e, i);
          },
          showGiftCode: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.node.active = !0),
              (this.GiftCode.node.active = !0),
              (this.objShow = this.GiftCode.node),
              this.GiftCode.show(e, i);
          },
          showEventVip: function () {
            (this.node.active = this.EventVip.node.active = !0),
              (this.objShow = this.EventVip.node);
          },
          showEventAngribird: function () {
            (this.node.active = !0),
              (this.EventAngryBird.node.active = !0),
              (this.objShow = this.EventAngryBird.node);
          },
          showEventBigBabol: function () {
            (this.node.active = this.EventBigBabol.node.active = !0),
              (this.objShow = this.EventBigBabol.node);
          },
          showEventMiniPoker: function () {
            (this.node.active = this.EventMiniPoker.node.active = !0),
              (this.objShow = this.EventMiniPoker.node);
          },
          showHistoryTaiXiu: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
            (this.HistoryTaiXiu.taixiu = !!e),
              (this.node.active = this.HistoryTaiXiu.node.active = !0),
              (this.objShow = this.HistoryTaiXiu.node);
          },
          showBank: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.node.active = !0),
              (this.Bank.node.active = !0),
              (this.objShow = this.Bank.node),
              this.Bank.show(e, i);
          },
          showRemove: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.node.active = !0),
              (this.Remove.node.active = !0),
              (this.objShow = this.Remove.node),
              this.Remove.show(e, i);
          },
        }),
          cc._RF.pop();
      },
      {
        EventAngryBird: "EventAngryBird",
        EventBigBabol: "EventBigBabol",
        EventMiniPoker: "EventMiniPoker",
        EventVip: "EventVip",
        HistoryTaiXiu: "HistoryTaiXiu",
        dialog_Bank: "dialog_Bank",
        dialog_DanhSachDaiLy: "dialog_DanhSachDaiLy",
        dialog_DanhSachTranDau: "dialog_DanhSachTranDau",
        dialog_GiftCode: "dialog_GiftCode",
        dialog_QuanLyTheCao: "dialog_QuanLyTheCao",
        dialog_remove: "dialog_remove",
      },
    ],
    DisableClick: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "a0680bUBBRNNZFsRV8g5DR/", "DisableClick"),
          cc.Class({
            extends: cc.Component,
            onEnable: function () {
              this.node.on("touchstart", function (t) {
                t.stopPropagation();
              }),
                this.node.on("touchend", function (t) {
                  t.stopPropagation();
                });
            },
            onDisable: function () {
              this.node.off("touchstart", function (t) {
                t.stopPropagation();
              }),
                this.node.off("touchend", function (t) {
                  t.stopPropagation();
                });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    DoiMatKhau: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "a7e31TIJTNGnpUGHsG6ZzxG", "DoiMatKhau");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            passOld: { default: null, type: cc.EditBox },
            passNew: { default: null, type: cc.EditBox },
            rePassNew: { default: null, type: cc.EditBox },
          },
          onChangerClick: function () {
            n.isEmpty(this.passOld.string) ||
            n.isEmpty(this.passNew.string) ||
            n.isEmpty(this.rePassNew.string)
              ? cc.RedT.notice.show({
                  title: "\u0110\u1ed4I M\u1eacT KH\u1ea8U",
                  text: "Kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng c\xe1c th\xf4ng tin...",
                })
              : this.passOld.string == this.passNew.string
              ? cc.RedT.notice.show({
                  title: "\u0110\u1ed4I M\u1eacT KH\u1ea8U",
                  text: "M\u1eadt Kh\u1ea9u m\u1edbi kh\xf4ng \u0111\u01b0\u1ee3c tr\xf9ng v\u1edbi m\u1eadt kh\u1ea9u c\u0169...",
                })
              : this.passNew.string != this.rePassNew.string
              ? cc.RedT.notice.show({
                  title: "\u0110\u1ed4I M\u1eacT KH\u1ea8U",
                  text: "M\u1eadt Kh\u1ea9u nh\u1eadp l\u1ea1i kh\xf4ng kh\u1edbp...",
                })
              : this.passOld.length > 32 ||
                this.passOld.length < 5 ||
                this.passNew.length > 32 ||
                this.passNew.length < 5
              ? cc.RedT.notice.show({
                  title: "\u0110\u1ed4I M\u1eacT KH\u1ea8U",
                  text: "\u0110\u1ed9 d\xe0i m\u1eadt kh\u1ea9u t\u1eeb 5 \u0111\u1ebfn 32 k\xfd t\u1ef1...",
                })
              : cc.RedT.send({
                  admin: {
                    doi_pass: {
                      password: this.passOld.string,
                      newPassword: this.passNew.string,
                      newPassword2: this.rePassNew.string,
                    },
                  },
                });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    EVipPoint_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "600d5eFIE1I/aadmlV/COG1", "EVipPoint_item"),
          cc.Class({
            extends: cc.Component,
            properties: {
              bg: cc.Node,
              top: cc.Label,
              nick: cc.Label,
              vip: cc.Label,
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    EventAngryBird: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "e3b5cQ8ECRKm7lWWcZdsHAr", "EventAngryBird"),
          cc.Class({
            extends: cc.Component,
            properties: {
              huD100: cc.EditBox,
              huP100: cc.EditBox,
              huX100: cc.EditBox,
              huD1000: cc.EditBox,
              huP1000: cc.EditBox,
              huX1000: cc.EditBox,
              huD10000: cc.EditBox,
              huP10000: cc.EditBox,
              huX10000: cc.EditBox,
              date: { default: [], type: cc.Toggle },
            },
            onEnable: function () {
              cc.RedT.send({ angrybird: { getEvent: !0 } });
            },
            onData: function (t) {
              (this.huD100.string = t[100].toX),
                (this.huP100.string = t[100].balans),
                (this.huX100.string = t[100].x),
                (this.huD1000.string = t[1e3].toX),
                (this.huP1000.string = t[1e3].balans),
                (this.huX1000.string = t[1e3].x),
                (this.huD10000.string = t[1e4].toX),
                (this.huP10000.string = t[1e4].balans),
                (this.huX10000.string = t[1e4].x),
                Promise.all(
                  this.date.map(function (e, i) {
                    e.isChecked = t[i];
                  })
                );
            },
            onClickSave: function () {
              cc.RedT.send({
                angrybird: {
                  setEvent: {
                    0: this.date[0].isChecked,
                    1: this.date[1].isChecked,
                    2: this.date[2].isChecked,
                    3: this.date[3].isChecked,
                    4: this.date[4].isChecked,
                    5: this.date[5].isChecked,
                    6: this.date[6].isChecked,
                    huD100: this.huD100.string,
                    huP100: this.huP100.string,
                    huX100: this.huX100.string,
                    huD1000: this.huD1000.string,
                    huP1000: this.huP1000.string,
                    huX1000: this.huX1000.string,
                    huD10000: this.huD10000.string,
                    huP10000: this.huP10000.string,
                    huX10000: this.huX10000.string,
                  },
                },
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    EventBigBabol: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "58c1axPMZhFarf9rEP3QSYG", "EventBigBabol"),
          cc.Class({
            extends: cc.Component,
            properties: {
              huD100: cc.EditBox,
              huP100: cc.EditBox,
              huX100: cc.EditBox,
              huD1000: cc.EditBox,
              huP1000: cc.EditBox,
              huX1000: cc.EditBox,
              huD10000: cc.EditBox,
              huP10000: cc.EditBox,
              huX10000: cc.EditBox,
              date: { default: [], type: cc.Toggle },
            },
            onEnable: function () {
              cc.RedT.send({ big_babol: { getEvent: !0 } });
            },
            onData: function (t) {
              (this.huD100.string = t[100].toX),
                (this.huP100.string = t[100].balans),
                (this.huX100.string = t[100].x),
                (this.huD1000.string = t[1e3].toX),
                (this.huP1000.string = t[1e3].balans),
                (this.huX1000.string = t[1e3].x),
                (this.huD10000.string = t[1e4].toX),
                (this.huP10000.string = t[1e4].balans),
                (this.huX10000.string = t[1e4].x),
                Promise.all(
                  this.date.map(function (e, i) {
                    e.isChecked = t[i];
                  })
                );
            },
            onClickSave: function () {
              cc.RedT.send({
                big_babol: {
                  setEvent: {
                    0: this.date[0].isChecked,
                    1: this.date[1].isChecked,
                    2: this.date[2].isChecked,
                    3: this.date[3].isChecked,
                    4: this.date[4].isChecked,
                    5: this.date[5].isChecked,
                    6: this.date[6].isChecked,
                    huD100: this.huD100.string,
                    huP100: this.huP100.string,
                    huX100: this.huX100.string,
                    huD1000: this.huD1000.string,
                    huP1000: this.huP1000.string,
                    huX1000: this.huX1000.string,
                    huD10000: this.huD10000.string,
                    huP10000: this.huP10000.string,
                    huX10000: this.huX10000.string,
                  },
                },
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    EventMiniPoker: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "51e23I0Sq5A86V1PAyrQREz", "EventMiniPoker"),
          cc.Class({
            extends: cc.Component,
            properties: {
              huD100: cc.EditBox,
              huP100: cc.EditBox,
              huX100: cc.EditBox,
              huD1000: cc.EditBox,
              huP1000: cc.EditBox,
              huX1000: cc.EditBox,
              huD10000: cc.EditBox,
              huP10000: cc.EditBox,
              huX10000: cc.EditBox,
              date: { default: [], type: cc.Toggle },
            },
            onEnable: function () {
              cc.RedT.send({ mini_poker: { getEvent: !0 } });
            },
            onData: function (t) {
              (this.huD100.string = t[100].toX),
                (this.huP100.string = t[100].balans),
                (this.huX100.string = t[100].x),
                (this.huD1000.string = t[1e3].toX),
                (this.huP1000.string = t[1e3].balans),
                (this.huX1000.string = t[1e3].x),
                (this.huD10000.string = t[1e4].toX),
                (this.huP10000.string = t[1e4].balans),
                (this.huX10000.string = t[1e4].x),
                Promise.all(
                  this.date.map(function (e, i) {
                    e.isChecked = t[i];
                  })
                );
            },
            onClickSave: function () {
              cc.RedT.send({
                mini_poker: {
                  setEvent: {
                    0: this.date[0].isChecked,
                    1: this.date[1].isChecked,
                    2: this.date[2].isChecked,
                    3: this.date[3].isChecked,
                    4: this.date[4].isChecked,
                    5: this.date[5].isChecked,
                    6: this.date[6].isChecked,
                    huD100: this.huD100.string,
                    huP100: this.huP100.string,
                    huX100: this.huX100.string,
                    huD1000: this.huD1000.string,
                    huP1000: this.huP1000.string,
                    huX1000: this.huX1000.string,
                    huD10000: this.huD10000.string,
                    huP10000: this.huP10000.string,
                    huX10000: this.huX10000.string,
                  },
                },
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    EventTopVip: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0ad30bgPGdFKKAy6aLi4Nii", "EventTopVip");
        var n = t("Helper").numberPad,
          o = t("Helper").numberWithCommas;
        cc.Class({
          extends: cc.Component,
          properties: {
            time_f: cc.Label,
            time_t: cc.Label,
            time_h: cc.Label,
            member: cc.Label,
            content: cc.Node,
            giai: cc.Node,
            item: cc.Prefab,
            isLoad: !1,
            distance: !1,
          },
          onEnable: function () {
            cc.RedT.send({ eventvip: { getData: !0 } });
          },
          onData: function (t) {
            (this.isLoad = !0),
              void 0 !== t.config && this.config(t.config),
              void 0 !== t.top && this.top(t.top),
              t.setupData && cc.RedT.dialog.EventVip.onData(t.setupData);
          },
          top: function (t) {
            this.content.destroyAllChildren(),
              t.forEach(
                function (t, e) {
                  var i = cc.instantiate(this.item);
                  ((i = i.getComponent("EVipPoint_item")).bg.active = e % 2),
                    (i.nick.string = t.name),
                    0 === e
                      ? ((i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !0),
                        (i.top.string = 1),
                        (i.nick.node.color =
                          i.nick.node.color.fromHEX("#FF0000")),
                        (i.vip.node.color = i.nick.node.color),
                        (i.vip.string = t.vip))
                      : 1 === e
                      ? ((i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !0),
                        (i.top.string = 2),
                        (i.nick.node.color =
                          i.nick.node.color.fromHEX("#6BF300")),
                        (i.vip.node.color = i.nick.node.color),
                        (i.vip.string = t.vip))
                      : 2 === e
                      ? ((i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !0),
                        (i.top.string = 3),
                        (i.nick.node.color =
                          i.nick.node.color.fromHEX("#FFA300")),
                        (i.vip.node.color = i.nick.node.color),
                        (i.vip.string = t.vip))
                      : ((i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !1),
                        (i.top.node.active = !0),
                        (i.top.string = e + 1),
                        (i.nick.node.color = cc.Color.WHITE),
                        (i.vip.node.color = cc.Color.WHITE),
                        (i.vip.string = t.vip)),
                    this.content.addChild(i.node);
                }.bind(this)
              );
          },
          config: function (t) {
            if (0 === t.begin_d)
              (this.time_f.string = "00/00"),
                (this.time_t.string = "00/00"),
                (this.time_h.string =
                  "S\u1ef1 ki\u1ec7n ch\u01b0a di\u1ec5n ra");
            else {
              (this.member.string = t.member),
                (this.time_f.string = n(t.begin_d, 2) + "/" + n(t.begin_m, 2));
              new Date();
              var e = new Date(t.begin_y, t.begin_m - 1, t.begin_d);
              e.setDate(e.getDate() + t.day),
                (this.time_t.string =
                  n(e.getDate(), 2) + "/" + n(e.getMonth() + 1, 2)),
                (this.timeEnd = new Date(t.begin_y, t.begin_m - 1, t.begin_d)),
                this.timeEnd.setDate(this.timeEnd.getDate() + t.day + 1),
                (this.timeEnd = this.timeEnd.getTime());
              var i = new Date().getTime();
              if (
                (this.timeEnd - i < 0
                  ? ((this.distance = !0),
                    (this.time_h.string =
                      "S\u1ef1 ki\u1ec7n \u0111\xe3 k\u1ebft th\xfac"))
                  : t.status ||
                    (this.time_h.string =
                      "S\u1ef1 ki\u1ec7n s\u1eafp di\u1ec5n ra!"),
                t.member > 0)
              )
                this.giai.children[0].children[1].getComponent(
                  cc.Label
                ).string = o(t.top1);
              if (t.member > 1)
                this.giai.children[1].children[1].getComponent(
                  cc.Label
                ).string = o(t.top2);
              if (t.member > 2)
                this.giai.children[2].children[1].getComponent(
                  cc.Label
                ).string = o(t.top3);
              if (t.member > 3)
                this.giai.children[3].children[1].getComponent(
                  cc.Label
                ).string = o(t.top4);
              if (t.member > 4)
                this.giai.children[4].children[1].getComponent(
                  cc.Label
                ).string = o(t.top5);
              if (t.member > 5)
                if (
                  ((this.giai.children[5].children[1].getComponent(
                    cc.Label
                  ).string = o(t.top6_10)),
                  t.member < 11)
                )
                  (this.giai.children[5].children[0].getComponent(
                    cc.Label
                  ).string = "6-" + t.member),
                    (this.giai.children[6].active = !1),
                    (this.giai.children[7].active = !1),
                    (this.giai.children[8].active = !1);
              if (t.member > 10)
                if (
                  ((this.giai.children[6].children[1].getComponent(
                    cc.Label
                  ).string = o(t.top11_20)),
                  t.member < 21)
                )
                  (this.giai.children[6].children[0].getComponent(
                    cc.Label
                  ).string = "11-" + t.member),
                    (this.giai.children[7].active = !1),
                    (this.giai.children[8].active = !1);
              if (t.member > 20)
                if (
                  ((this.giai.children[7].children[1].getComponent(
                    cc.Label
                  ).string = o(t.top21_50)),
                  t.member < 51)
                )
                  (this.giai.children[7].children[0].getComponent(
                    cc.Label
                  ).string = "21-" + t.member),
                    (this.giai.children[8].active = !1);
              if (t.member > 50)
                this.giai.children[8].children[1].getComponent(
                  cc.Label
                ).string = o(t.top51_xxx);
            }
          },
          update: function (t) {
            if (!1 === this.distance) {
              var e = new Date().getTime(),
                i = this.timeEnd - e;
              if (i < 0)
                this.time_h.string =
                  "S\u1ef1 ki\u1ec7n \u0111\xe3 k\u1ebft th\xfac";
              else {
                var o = Math.floor(i / 864e5),
                  a = Math.floor((i % 864e5) / 36e5),
                  s = Math.floor((i % 36e5) / 6e4),
                  c = Math.floor((i % 6e4) / 1e3),
                  r = "";
                o > 0 && (r += o + " ng\xe0y\n"),
                  (r += n(a, 2) + ":" + n(s, 2) + ":" + n(c, 2)),
                  (this.time_h.string = r);
              }
            }
          },
          onClickTraThuong: function () {
            cc.RedT.send({ eventvip: { trathuong: !0 } });
          },
          onResetClick: function () {
            cc.RedT.send({ eventvip: { reset: !0 } });
          },
          onClickConfig: function () {
            cc.RedT.dialog.showEventVip();
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    EventVip: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "94f19lKqA1OObzGelp2d7nd", "EventVip"),
          cc.Class({
            extends: cc.Component,
            properties: {
              Begin_D: cc.EditBox,
              Begin_M: cc.EditBox,
              Begin_Y: cc.EditBox,
              Day: cc.EditBox,
              Member: cc.EditBox,
              Top1: cc.EditBox,
              Top2: cc.EditBox,
              Top3: cc.EditBox,
              Top4: cc.EditBox,
              Top5: cc.EditBox,
              Top6_10: cc.EditBox,
              Top11_20: cc.EditBox,
              Top21_50: cc.EditBox,
              Top51_xxx: cc.EditBox,
              status: { default: [], type: cc.Toggle },
            },
            onEnable: function () {
              cc.RedT.send({ eventvip: { setupEvent: !0 } });
            },
            onData: function (t) {
              (this.Begin_D.string = t.begin_d),
                (this.Begin_M.string = t.begin_m),
                (this.Begin_Y.string = t.begin_y),
                (this.Day.string = t.day),
                (this.Member.string = t.member),
                (this.Top1.string = t.top1),
                (this.Top2.string = t.top2),
                (this.Top3.string = t.top3),
                (this.Top4.string = t.top4),
                (this.Top5.string = t.top5),
                (this.Top6_10.string = t.top6_10),
                (this.Top11_20.string = t.top11_20),
                (this.Top21_50.string = t.top21_50),
                (this.Top51_xxx.string = t.top51_xxx),
                t.status
                  ? ((this.status[0].isChecked = !1),
                    (this.status[1].isChecked = !0))
                  : ((this.status[0].isChecked = !0),
                    (this.status[1].isChecked = !1));
            },
            onClickSave: function () {
              cc.RedT.send({
                eventvip: {
                  update: {
                    status: this.status[1].isChecked,
                    begin_d: this.Begin_D.string,
                    begin_m: this.Begin_M.string,
                    begin_y: this.Begin_Y.string,
                    day: this.Day.string,
                    member: this.Member.string,
                    top1: this.Top1.string,
                    top2: this.Top2.string,
                    top3: this.Top3.string,
                    top4: this.Top4.string,
                    top5: this.Top5.string,
                    top6_10: this.Top6_10.string,
                    top11_20: this.Top11_20.string,
                    top21_50: this.Top21_50.string,
                    top51_xxx: this.Top51_xxx.string,
                  },
                },
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    GiftCode_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "92bd9w+Ec9GQIrn5NqKutHC", "GiftCode_item");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            time: cc.Label,
            code: cc.Label,
            red: cc.Label,
            xu: cc.Label,
            status: cc.Label,
            chung: cc.Label,
            han: cc.Label,
          },
          remove: function () {
            cc.RedT.dialog.showGiftCode(null, "Remove", this.data._id);
          },
          setData: function () {
            (this.time.string = n.getStringDateByTime(this.data.date)),
              (this.code.string = this.data.code),
              (this.red.string = n.numberWithCommas(this.data.red)),
              (this.xu.string = n.numberWithCommas(this.data.xu)),
              (this.status.string =
                void 0 === this.data.uid ? "C\xf2n" : "\u0110\xe3 n\u1ea1p"),
              (this.chung.string = this.data.type),
              (this.han.string = n.getDateByTime(
                new Date(this.data.todate) - 1
              ));
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    GiftCode: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9bbafijh5BEMIYTY7+0DPQ3", "GiftCode"),
          cc.Class({
            extends: cc.Component,
            properties: { content: cc.Node, pagination: cc.Node, isLoad: !1 },
            onLoad: function () {
              var t = this;
              (this.pagination = this.pagination.getComponent("Pagination")),
                Promise.all(
                  this.content.children.map(function (t) {
                    return t.getComponent("GiftCode_item");
                  })
                ).then(function (e) {
                  t.content2 = e;
                }),
                this.pagination.init(this);
            },
            onEnable: function () {
              this.get_data();
            },
            onDisable: function () {},
            reset: function () {
              this.isLoad = !1;
            },
            get_data: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1;
              (this.isLoad = !0),
                cc.RedT.send({ giftcode: { get_data: { page: t } } });
            },
            onData: function (t) {
              void 0 !== t.get_data && this.setData(t.get_data),
                void 0 !== t.get_gift &&
                  (cc.RedT.dialog.GiftCode.editGift.string = t.get_gift),
                void 0 !== t.get_auto &&
                  cc.RedT.dialog.GiftCode.onData(t.get_auto);
            },
            setData: function (t) {
              var e = this;
              this.pagination.onSet(t.page, t.kmess, t.total),
                this.content2.map(function (i, n) {
                  var o = t.data[n];
                  void 0 !== o
                    ? ((e.content.children[n].active = !0),
                      (i.data = o),
                      i.setData())
                    : (e.content.children[n].active = !1);
                });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    HeThong: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0b9d779VQpJTJ6YRcgeT2Xv", "HeThong"),
          cc.Class({
            extends: cc.Component,
            properties: {
              fanpage: cc.EditBox,
              msgtele: cc.EditBox,
              nicknametele: cc.EditBox,
              msghomthu: cc.EditBox,
              nicknamehomthu: cc.EditBox,
              TXBot: { default: [], type: cc.Toggle },
              BCBot: { default: [], type: cc.Toggle },
            },
            onEnable: function () {
              cc.RedT.send({ sys: { get_data: !0 } }),
                this.TXBot.forEach(
                  function (t) {
                    t.node.on(
                      cc.Node.EventType.TOUCH_START,
                      this.txStart,
                      this
                    ),
                      t.node.on(cc.Node.EventType.TOUCH_END, this.txEnd, this);
                  }.bind(this)
                ),
                this.BCBot.forEach(
                  function (t) {
                    t.node.on(
                      cc.Node.EventType.TOUCH_START,
                      this.bcStart,
                      this
                    ),
                      t.node.on(cc.Node.EventType.TOUCH_END, this.bcEnd, this);
                  }.bind(this)
                );
            },
            onDisable: function () {
              this.TXBot.forEach(
                function (t) {
                  t.node.off(cc.Node.EventType.TOUCH_START, this.txStart, this),
                    t.node.off(cc.Node.EventType.TOUCH_END, this.txEnd, this);
                }.bind(this)
              ),
                this.BCBot.forEach(
                  function (t) {
                    t.node.off(
                      cc.Node.EventType.TOUCH_START,
                      this.bcStart,
                      this
                    ),
                      t.node.off(cc.Node.EventType.TOUCH_END, this.bcEnd, this);
                  }.bind(this)
                );
            },
            txStart: function (t) {},
            txEnd: function (t) {
              cc.RedT.send({ sys: { txbot: t.target.name } });
            },
            bcStart: function (t) {},
            bcEnd: function (t) {
              cc.RedT.send({ sys: { bcbot: t.target.name } });
            },
            onData: function (t) {
              void 0 !== t.txbot && this.getTXBot(t.txbot),
                void 0 !== t.bcbot && this.getBCBot(t.bcbot),
                t.fanpage && (this.fanpage.string = t.fanpage);
            },
            getTXBot: function (t) {
              this.TXBot.forEach(function (e, i) {
                e.isChecked = !!i == t;
              });
            },
            getBCBot: function (t) {
              this.BCBot.forEach(function (e, i) {
                e.isChecked = !!i == t;
              });
            },
            onClearClick: function () {
              cc.RedT.send({ sys: { clear: !0 } });
            },
            setFanpage: function () {
              cc.RedT.send({ sys: { fanpage: this.fanpage.string } });
            },
            onSendAllTele: function () {
              cc.RedT.send({ sys: { SendAllTele: this.msgtele.string } });
            },
            onSendOneHomThu: function () {
              cc.RedT.send({
                sys: {
                  SendHomThu: {
                    msg: this.msghomthu.string,
                    nickname: this.nicknamehomthu.string,
                  },
                },
              });
            },
            onSendAllHomThu: function () {
              cc.RedT.send({ sys: { SendAllHomThu: this.msghomthu.string } });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Header: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "53591NaLdpJxoW9GVWXh0FR", "Header"),
          cc.Class({
            extends: cc.Component,
            properties: {
              nodeUsers: { default: null, type: cc.Node },
              nodeGuest: { default: null, type: cc.Node },
              exp: { default: null, type: cc.Node },
              userName: { default: null, type: cc.Label },
              userRed: { default: null, type: cc.Label },
              userXu: { default: null, type: cc.Label },
              expFull: 0,
            },
            isSignIn: function () {
              (this.nodeUsers.active = !0), (this.nodeGuest.active = !1);
            },
            isSignOut: function () {
              (this.userName.string =
                this.userRed.string =
                this.userXu.string =
                  ""),
                (this.nodeUsers.active = !1),
                (this.nodeGuest.active = !0);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Helper: [
      function (t, e, i) {
        "use strict";
        function n(t) {
          if (t) {
            var e = (t = parseInt(t)).toString().split(".");
            return (
              (e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")), e.join(".")
            );
          }
          return "0";
        }
        cc._RF.push(e, "ea8443jZShFSboJocQ6Ztdo", "Helper"),
          (e.exports = {
            checkPhoneValid: function (t) {
              return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(
                t
              );
            },
            nFormatter: function (t, e) {
              for (
                var i = [
                    { value: 1e18, symbol: "E" },
                    { value: 1e15, symbol: "P" },
                    { value: 1e12, symbol: "T" },
                    { value: 1e9, symbol: "G" },
                    { value: 1e6, symbol: "M" },
                    { value: 1e3, symbol: "k" },
                  ],
                  n = /\.0+$|(\.[0-9]*[1-9])0+$/,
                  o = 0;
                o < i.length;
                o++
              )
                if (t >= i[o].value)
                  return (
                    (t / i[o].value).toFixed(e).replace(n, "$1") + i[o].symbol
                  );
              return t.toFixed(e).replace(n, "$1");
            },
            numberWithCommas: n,
            isEmpty: function (t) {
              return !t || 0 === t.length;
            },
            getOnlyNumberInString: function (t) {
              var e = t.match(/\d+/g);
              return e ? e.join("") : "";
            },
            numberPad: function (t, e) {
              for (var i = "" + t; i.length < e; ) i = "0" + i;
              return i;
            },
            inputNumber: function (t) {
              var e = !1;
              t.addEventListener("keydown", function (t) {
                16 === t.keyCode && (t.preventDefault(), (e = !0));
              }),
                t.addEventListener("keyup", function (t) {
                  16 === t.keyCode && (t.preventDefault(), (e = !1));
                }),
                t.addEventListener("keydown", function (t) {
                  (!e &&
                    ((t.keyCode >= 48 && t.keyCode <= 57) ||
                      (t.keyCode >= 96 && t.keyCode <= 105) ||
                      (t.keyCode >= 37 && t.keyCode <= 40) ||
                      107 === t.keyCode ||
                      109 === t.keyCode ||
                      189 === t.keyCode ||
                      8 === t.keyCode ||
                      13 === t.keyCode)) ||
                    t.preventDefault();
                });
            },
            anPhanTram: function (t, e) {
              return t * e - Math.ceil((t * e) / 100);
            },
            truChietKhau: function (t) {
              return t - Math.ceil((2 * t) / 100);
            },
            numberTo: function (t, e, i, o) {
              var a =
                arguments.length > 4 && void 0 !== arguments[4] && arguments[4];
              clearInterval(t.timer);
              var s = i - e,
                c = Math.abs(Math.floor(o / s));
              c = Math.max(c, 50);
              var r = new Date().getTime() + o;
              t.timer = setInterval(function () {
                var e = new Date().getTime(),
                  c = Math.max((r - e) / o, 0),
                  h = Math.round(i - c * s);
                (t.string = !0 === a ? n(h) : h),
                  h == i && clearInterval(t.timer);
              }, c);
            },
            getStringDateByTime: function (t) {
              var e = new Date(t),
                i = e.getHours(),
                n = e.getMinutes(),
                o = e.getDate(),
                a = e.getMonth() + 1;
              return (
                i < 10 && (i = "0" + i),
                n < 10 && (n = "0" + n),
                o < 10 && (o = "0" + o),
                a < 10 && (a = "0" + a),
                i + ":" + n + " " + o + "/" + a + "/" + e.getFullYear()
              );
            },
            getDateByTime: function (t) {
              var e = new Date(t);
              return (
                e.getDate() + "/" + (e.getMonth() + 1) + "/" + e.getFullYear()
              );
            },
            getStringHourByTime: function (t) {
              var e = new Date(t),
                i = e.getHours(),
                n = e.getMinutes(),
                o = e.getSeconds();
              return (
                i < 10 && (i = "0" + i),
                n < 10 && (n = "0" + n),
                o < 10 && (o = "0" + o),
                i + ":" + n + ":" + o
              );
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    HistoryTXitem: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ab6east5Q9PXrusemE/FynL", "HistoryTXitem"),
          cc.Class({
            extends: cc.Component,
            properties: {
              time: cc.Label,
              phien: cc.Label,
              dat: cc.Label,
              kq: cc.Label,
              bet: cc.Label,
              re: cc.Label,
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    HistoryTaiXiu: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9c176/OATBKhoPaiO7PWyWQ", "HistoryTaiXiu");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            content: cc.Node,
            pages: cc.Prefab,
            nodeRed: cc.Node,
            nodeXu: cc.Node,
            taixiu: !0,
            red: !0,
          },
          onLoad: function () {
            var t = this;
            (this.pages = cc.instantiate(this.pages)),
              (this.pages.y = -304),
              this.node.addChild(this.pages),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this),
              Promise.all(
                this.content.children.map(function (t) {
                  return t.getComponent("HistoryTXitem");
                })
              ).then(function (e) {
                t.content = e;
              });
          },
          onEnable: function () {
            this.get_data();
          },
          onChangerRed: function () {
            (this.red = !this.red),
              (this.nodeRed.active = !this.nodeRed.active),
              (this.nodeXu.active = !this.nodeXu.active),
              this.get_data();
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              users: {
                history: {
                  taixiu: {
                    id: cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUEdit.idT,
                    taixiu: this.taixiu,
                    red: this.red,
                    page: t,
                  },
                },
              },
            });
          },
          onData: function (t) {
            var e = this;
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (i, o) {
                  var a = t.data[o];
                  void 0 !== a
                    ? ((i.node.active = !0),
                      (i.time.string = n.getStringDateByTime(a.time)),
                      (i.phien.string = a.phien),
                      (i.dat.string = e.taixiu
                        ? a.select
                          ? "T\xe0i"
                          : "X\u1ec9u"
                        : a.select
                        ? "Ch\u1eb5n"
                        : "L\u1ebb"),
                      (i.kq.string =
                        a.dice1 +
                        "-" +
                        a.dice2 +
                        "-" +
                        a.dice3 +
                        "  " +
                        (a.dice1 + a.dice2 + a.dice3)),
                      (i.bet.string = n.numberWithCommas(a.bet)),
                      (i.re.string = n.numberWithCommas(a.tralai)))
                    : (i.node.active = !1);
                })
              );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    LongLan: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "986e4oOeDNJnZcf0zeALvY1", "LongLan");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            chedo: { default: [], type: cc.Toggle },
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
            red: !0,
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ longlan: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              longlan: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ longlan: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ longlan: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    MainAudio: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "738b2QcBnhOn7bLV2UFI4l9", "MainAudio"),
          cc.Class({
            extends: cc.Component,
            properties: {
              audioBackground: { default: null, type: cc.AudioClip },
              audioClick: { default: null, type: cc.AudioClip },
              audioClick2: { default: null, type: cc.AudioClip },
            },
            onLoad: function () {},
            playMusic: function () {
              cc.audioEngine.playMusic(this.audioBackground, !0);
            },
            pauseMusic: function () {
              cc.audioEngine.pauseMusic();
            },
            resumeMusic: function () {
              cc.audioEngine.resumeMusic();
            },
            _playSFX: function (t) {
              cc.audioEngine.playEffect(t, !1);
            },
            playClick: function () {
              this._playSFX(this.audioClick);
            },
            playUnClick: function () {
              this._playSFX(this.audioClick2);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    MainGame: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "280c3rsZJJKnZ9RqbALVwtK", "MainGame");
        t("Helper");
        var n = t("Panel"),
          o = t("SignIn"),
          a = t("MainAudio"),
          s = t("Dialog"),
          c = t("Notice");
        cc.Class({
          extends: cc.Component,
          properties: {
            nodeSignIn: o,
            nodePanel: n,
            audio: a,
            dialog: s,
            loading: cc.Node,
            notice: c,
            IS_LOGIN: !1,
            IS_SOUND: !0,
            isConnected: !1,
          },
          onLoad: function () {
            (this._socket = null),
              (cc.RedT = this),
              (this.user = {}),
              this.dialog.init(),
              this.nodePanel.init(),
              this.reconnect();
          },
          connect: function (t) {
            var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : "/",
              i =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
            arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
            this.isConnected ||
              ((this._socket = new WebSocket(
                "ws://" + t + (i ? ":" + i : "") + e
              )),
              (this._socket.onopen = this._onSocketConnect),
              (this._socket.onclose = this._onSocketDisconnect),
              (this._socket.onmessage = this._onSocketData),
              (this._socket.onerror = this._onSocketError),
              (this.isConnected = !0));
          },
          disconnect: function () {
            (this.isConnected = !1), this._socket.close();
          },
          send: function (t) {
            this._socket.OPEN == this._socket.readyState &&
              this._socket.send(this._encodeMessage(t));
          },
          _decodeMessage: function (t) {
            return JSON.parse(t);
          },
          _encodeMessage: function (t) {
            return JSON.stringify(t);
          },
          _onSocketConnect: function () {
            cc.RedT.isConnected = !0;
          },
          _onSocketDisconnect: function () {
            (cc.RedT.isConnected = !1), cc.RedT.signOut();
          },
          _onSocketData: function (t) {
            var e = t.data;
            (e = cc.RedT._decodeMessage(e)), cc.RedT.onData(e);
          },
          _onSocketError: function (t) {
            cc.RedT.signOut();
          },
          reconnect: function () {
            this.connect("127.0.0.1", "/adminsocket", !1, !0);
          },
          auth: function (t) {
            var e = this;
            (this.loading.active = !0),
              this.reconnect(),
              null == this._socket || 1 != this._socket.readyState
                ? setTimeout(function () {
                    e.send(t);
                  }, 300)
                : this.send(t);
          },
          unAuthorized: function (t) {
            (this.loading.active = !1),
              void 0 !== t.message
                ? this.notice.show({
                    title: "\u0110\u0102NG K\xdd",
                    text: "C\xf3 l\u1ed7i s\u1ea3y ra, xin vui l\xf2ng th\u1eed l\u1ea1i...",
                  })
                : this.notice.show(t);
          },
          onData: function (t) {
            void 0 !== t.unauth && this.unAuthorized(t.unauth),
              void 0 !== t.Authorized && this.signIn(),
              void 0 !== t.taixiu && this.nodePanel.TaiXiu.onData(t.taixiu),
              void 0 !== t.baucua && this.nodePanel.BauCua.onData(t.baucua),
              void 0 !== t.bongda &&
                this.nodePanel.danhSachTranDau.onData(t.bongda),
              void 0 !== t.xocxoc && this.nodePanel.XocXoc.onData(t.xocxoc),
              void 0 !== t.rongho && this.nodePanel.RongHo.onData(t.rongho),
              void 0 !== t.mini_poker &&
                this.nodePanel.MiniPoker.onData(t.mini_poker),
              void 0 !== t.big_babol &&
                this.nodePanel.BigBabol.onData(t.big_babol),
              void 0 !== t.vq_red &&
                this.nodePanel.VuongQuocRed.onData(t.vq_red),
              void 0 !== t.mini3cay &&
                this.nodePanel.Mini3Cay.onData(t.mini3cay),
              void 0 !== t.angrybird &&
                this.nodePanel.AngryBird.onData(t.angrybird),
              void 0 !== t.candy && this.nodePanel.Candy.onData(t.candy),
              void 0 !== t.longlan && this.nodePanel.LongLan.onData(t.longlan),
              void 0 !== t.tamhung && this.nodePanel.TamHung.onData(t.tamhung),
              void 0 !== t.zeus && this.nodePanel.Zeus.onData(t.zeus),
              void 0 !== t.xs && this.nodePanel.XoSo.onData(t.xs),
              void 0 !== t.mua_the &&
                this.nodePanel.yeuCauRutThe.onData(t.mua_the),
              void 0 !== t.nap_the &&
                this.nodePanel.yeuCauNapThe.onData(t.nap_the),
              void 0 !== t.thecao &&
                this.nodePanel.quanLyTheCao.onData(t.thecao),
              void 0 !== t.daily &&
                this.nodePanel.danhSachDaiLy.onData(t.daily),
              void 0 !== t.users &&
                this.nodePanel.quanLyNguoiDung.onData(t.users),
              void 0 !== t.giftcode &&
                this.nodePanel.GiftCode.onData(t.giftcode),
              void 0 !== t.banklist &&
                this.nodePanel.BankList.onData(t.banklist),
              void 0 !== t.bankrut && this.nodePanel.BankRut.onData(t.bankrut),
              void 0 !== t.bankrut_remove && this.nodePanel.BankRut.remove(),
              void 0 !== t.banknap && this.nodePanel.BankNap.onData(t.banknap),
              void 0 !== t.sys && this.nodePanel.HeThong.onData(t.sys),
              void 0 !== t.eventvip &&
                cc.RedT.nodePanel.EventTopVip.onData(t.eventvip),
              void 0 !== t.notice && this.notice.show(t.notice);
          },
          dataUser: function (t) {},
          signOut: function () {
            (this.user = {}),
              (this.IS_LOGIN = !1),
              (this.nodeSignIn.node.active = !0),
              (this.nodePanel.node.active = !1),
              this.AllReset();
          },
          signIn: function () {
            (this.loading.active = !1),
              (this.IS_LOGIN = !0),
              (this.nodeSignIn.node.active = !1),
              (this.nodePanel.node.active = !0);
          },
          AllReset: function () {
            (this.loading.active = !1), this.nodePanel.isSignOut();
          },
          errConnect: function () {
            this.notice.show({
              title: "TH\xd4NG B\xc1O",
              text: "M\u1ea5t k\u1ebft n\u1ed1i...",
            });
          },
        }),
          cc._RF.pop();
      },
      {
        Dialog: "Dialog",
        Helper: "Helper",
        MainAudio: "MainAudio",
        Notice: "Notice",
        Panel: "Panel",
        SignIn: "SignIn",
      },
    ],
    Mini3Cay: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9c0daOZvY9Fgr+DYAc6YZOm", "Mini3Cay");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ mini3cay: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              mini3cay: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ mini3cay: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    MiniPoker: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "2ea525Eu7REXK5IZ3eU1HvF", "MiniPoker");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ mini_poker: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              mini_poker: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ mini_poker: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              t.eventData && cc.RedT.dialog.EventMiniPoker.onData(t.eventData);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          onClickEvent: function () {
            cc.RedT.dialog.showEventMiniPoker();
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    NapRed_itemOne: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3bf1do9lYJMTYqfuawCCr7t", "NapRed_itemOne"),
          cc.Class({
            extends: cc.Component,
            properties: {
              background: { default: null, type: cc.Node },
              text: { default: null, type: cc.Label },
            },
            init: function (t, e, i, n) {
              (this.controll = t),
                (this.local_arg = e),
                (this.local_text = i),
                (this.text.string = n);
            },
            onClickChanger: function () {
              cc.RedT.audio.playClick();
              var t = this;
              (this.controll[this.local_text].string = this.text),
                Promise.all(
                  this.this.controll[this.local_arg].map(function (e) {
                    e == t ? e.onSelect() : e.unSelect();
                  })
                );
            },
            onSelect: function () {
              (this.nodeUnSelect.active = !0), this.node.pauseSystemEvents();
            },
            unSelect: function () {
              (this.nodeUnSelect.active = !1), this.node.resumeSystemEvents();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    NapRed_itemTT: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "692acli1tBGMJGB7Xh9IFJc", "NapRed_itemTT"),
          cc.Class({
            extends: cc.Component,
            properties: {
              menhgia: { default: null, type: cc.Label },
              khuyenmai: { default: null, type: cc.Label },
              red: { default: null, type: cc.Label },
            },
            init: function (t, e, i) {
              (this.menhgia.string = t),
                (this.khuyenmai.string = e),
                (this.red.string = i);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    NapRed: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "41eebjrhpBCuYVy5G92Kdy9", "NapRed");
        var n = t("BrowserUtil");
        cc.Class({
          extends: cc.Component,
          properties: {
            header: { default: null, type: cc.Node },
            body: { default: null, type: cc.Node },
            NhanhMang: { default: null, type: cc.Label },
            MenhGia: { default: null, type: cc.Label },
            SoThe: { default: null, type: cc.EditBox },
            SoSeri: { default: null, type: cc.EditBox },
            moreNhaMang: { default: null, type: cc.Node },
            moreMenhGia: { default: null, type: cc.Node },
            scrollviewNhaMang: { default: null, type: cc.ScrollView },
            scrollviewMenhGia: { default: null, type: cc.ScrollView },
            bangGia: { default: null, type: cc.ScrollView },
            prefabLeft: { default: null, type: cc.Prefab },
            prefabRight: { default: null, type: cc.Prefab },
          },
          init: function () {
            var t = this,
              e = this;
            (this.isLoaded = !1),
              (this.editboxs = [this.SoThe, this.SoSeri]),
              (this.keyHandle = function (t) {
                return t.keyCode === cc.macro.KEY.tab
                  ? (e.isTop() && e.changeNextFocusEditBox(),
                    t.preventDefault && t.preventDefault(),
                    !1)
                  : t.keyCode === cc.macro.KEY.enter
                  ? (n.focusGame(),
                    e.onNapClick(),
                    t.preventDefault && t.preventDefault(),
                    !1)
                  : void 0;
              }),
              Promise.all(
                this.header.children.map(function (t) {
                  return t.getComponent("itemContentMenu");
                })
              ).then(function (e) {
                t.header = e;
              });
          },
          onEnable: function () {
            cc.sys.isBrowser && this.addEvent(),
              this.isLoaded || cc.RedT.send({ shop: { info_nap: !0 } });
          },
          onDisable: function () {
            (this.moreNhaMang.active = this.moreMenhGia.active = !1),
              cc.sys.isBrowser && this.removeEvent(),
              this.clean();
          },
          addEvent: function () {
            for (var t in (cc.systemEvent.on(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            ),
            this.editboxs))
              n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener(
                "keydown",
                this.keyHandle,
                !1
              );
          },
          removeEvent: function () {
            for (var t in this.editboxs)
              n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener(
                "keydown",
                this.keyHandle,
                !1
              );
            cc.systemEvent.off(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            );
          },
          onKeyDown: function (t) {
            switch (t.keyCode) {
              case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
              case cc.macro.KEY.enter:
                this.isTop() && this.onNapClick();
            }
          },
          changeNextFocusEditBox: function () {
            for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
              if (n.checkEditBoxFocus(this.editboxs[e])) {
                i <= ++e && (e = 0), n.focusEditBox(this.editboxs[e]), (t = !0);
                break;
              }
            !t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0]);
          },
          isTop: function () {
            return !(
              this.moreNhaMang.active ||
              this.moreMenhGia.active ||
              cc.RedT.notice.node.active ||
              cc.RedT.loading.active
            );
          },
          clean: function () {
            this.SoThe.string = this.SoSeri.string = "";
          },
          onNapClick: function () {},
          onSelectHead: function (t, e) {
            Promise.all(
              this.header.map(function (t) {
                t.node.name == e ? t.select() : t.unselect();
              })
            ),
              Promise.all(
                this.body.children.map(function (t) {
                  t.name == e ? (t.active = !0) : (t.active = !1);
                })
              );
          },
          toggleMoreNhaMang: function () {
            (this.moreNhaMang.active = !this.moreNhaMang.active),
              (this.moreMenhGia.active = !1);
          },
          toggleMoreMenhGia: function () {
            this.moreMenhGia.active = !this.moreMenhGia.active;
          },
          infoSet: function (t, e, i) {
            var n = this,
              o =
                (arguments.length > 3 &&
                  void 0 !== arguments[3] &&
                  arguments[3],
                this);
            t.length &&
              Promise.all(
                t.map(function (t) {
                  var e = cc.instantiate(o.prefabLeft),
                    i = e.getComponent("NapRed_itemOne");
                  if (type) o.scrollviewNhaMang.content.addChild(e);
                  else {
                    o.scrollviewMenhGia.content.addChild(e);
                    cc.instantiate(o.prefabRight);
                    o.bangGia.content.addChild(e);
                  }
                  return i;
                })
              ).this(function (t) {
                n[e] = t;
              });
          },
          onData: function (t) {
            void 0 === t.info ||
              this.isLoaded ||
              ((this.isLoaded = !0),
              void 0 !== t.nhamang &&
                this.infoSet(t.nhamang, "nhamangList", "NhanhMang", !0),
              void 0 !== t.menhgia &&
                this.infoSet(t.menhgia, "menhgiaList", "MenhGia"));
          },
        }),
          cc._RF.pop();
      },
      { BrowserUtil: "BrowserUtil" },
    ],
    Notice: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "55b77gHOPlJAY+OiMpR3w95", "Notice"),
          cc.Class({
            extends: cc.Component,
            properties: {
              nodeButton: { default: null, type: cc.Node },
              title: { default: null, type: cc.Label },
              text: { default: null, type: cc.Label },
              button: { default: null, type: cc.Label },
            },
            onDisable: function () {
              this.clean();
            },
            show: function (t) {
              (this.node.active = !0),
                void 0 !== t.title && (this.title.string = t.title),
                void 0 !== t.text && (this.text.string = t.text),
                void 0 !== t.button
                  ? ((this.text.node.y = 16),
                    (this.type = t.button.type),
                    (this.button.string = t.button.text))
                  : (this.text.node.y = -16);
            },
            close: function () {
              cc.RedT.audio.playUnClick(), (this.node.active = !1);
            },
            onClickButton: function () {},
            clean: function () {
              this.title.string = this.text.string = this.button.string = "";
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Pagination_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "6d972++j+RAQpAzftgyBeMb", "Pagination_item"),
          cc.Class({
            extends: cc.Component,
            properties: { bg: cc.Node, bg_select: cc.Node, number: cc.Label },
            start: function () {},
          }),
          cc._RF.pop();
      },
      {},
    ],
    Pagination: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "8030bLFMFdAGJZdIeB328ye", "Pagination"),
          cc.Class({
            extends: cc.Component,
            properties: {
              nodeFirst: cc.Node,
              nodePrevious: cc.Node,
              nodePage1: cc.Node,
              nodePage2: cc.Node,
              nodePage3: cc.Node,
              nodePage4: cc.Node,
              nodePage5: cc.Node,
              nodeNext: cc.Node,
              nodeLast: cc.Node,
              page: 1,
              kmess: 10,
              totall: 0,
            },
            init: function (t) {
              (this.controll = t),
                (this.objSelect = null),
                (this.nodePage1 =
                  this.nodePage1.getComponent("Pagination_item")),
                (this.nodePage2 =
                  this.nodePage2.getComponent("Pagination_item")),
                (this.nodePage3 =
                  this.nodePage3.getComponent("Pagination_item")),
                (this.nodePage4 =
                  this.nodePage4.getComponent("Pagination_item")),
                (this.nodePage5 =
                  this.nodePage5.getComponent("Pagination_item")),
                (this.arrO = [
                  this.nodePage1,
                  this.nodePage2,
                  this.nodePage3,
                  this.nodePage4,
                  this.nodePage5,
                ]);
            },
            select: function (t) {
              (t.number.string = this.page),
                (t.number.node.color = cc.Color.BLACK),
                (t.bg.active = !1),
                (t.bg_select.active = !0),
                (this.objSelect = t),
                t.node.pauseSystemEvents();
            },
            unSelect: function (t, e) {
              (t.number.string = e),
                (t.number.node.color = cc.Color.WHITE),
                (t.bg.active = !0),
                (t.bg_select.active = !1),
                (t.node.page = e),
                t.node.resumeSystemEvents();
            },
            onSet: function (t, e, i) {
              var n = this,
                o = this;
              (this.page = t),
                (this.kmess = e),
                (this.totall = i),
                (this.totalPage = Math.ceil(this.totall / this.kmess)),
                (this.pageRed = this.totalPage - this.page),
                i > 0
                  ? ((this.node.active = !0),
                    Promise.all(
                      this.arrO.map(function (t, e) {
                        return (
                          o.totalPage > 4
                            ? (t.node.active = !0)
                            : e < o.totalPage
                            ? (t.node.active = !0)
                            : (t.node.active = !1),
                          o.page > 2
                            ? (o.nodeFirst.active = !0)
                            : (o.nodeFirst.active = !1),
                          o.pageRed > 1
                            ? (o.nodeLast.active = !0)
                            : (o.nodeLast.active = !1),
                          o.page > 1
                            ? (o.nodePrevious.active = !0)
                            : (o.nodePrevious.active = !1),
                          o.pageRed > 0
                            ? (o.nodeNext.active = !0)
                            : (o.nodeNext.active = !1),
                          0 == e && 1 == o.page
                            ? o.select(t)
                            : 1 == e && 2 == o.page
                            ? o.select(t)
                            : 2 == e &&
                              (3 == o.page ||
                                (o.totalPage > 5 &&
                                  1 !== o.page &&
                                  2 !== o.page &&
                                  o.totalPage - 2 >= o.page))
                            ? o.select(t)
                            : 3 == e &&
                              ((4 == o.totalPage && 4 == o.page) ||
                                (o.totalPage > 4 && o.totalPage - 1 == o.page))
                            ? o.select(t)
                            : 4 == e && o.totalPage > 4 && o.page == o.totalPage
                            ? o.select(t)
                            : void 0
                        );
                      })
                    ).then(function (t) {
                      Promise.all(
                        n.arrO.map(function (t, e) {
                          t !== o.objSelect &&
                            (0 == e
                              ? "page2" == o.objSelect.node.name
                                ? o.unSelect(t, o.objSelect.number.string - 1)
                                : "page3" == o.objSelect.node.name
                                ? o.unSelect(t, o.objSelect.number.string - 2)
                                : "page4" == o.objSelect.node.name
                                ? o.unSelect(t, o.objSelect.number.string - 3)
                                : "page5" == o.objSelect.node.name &&
                                  o.unSelect(t, o.objSelect.number.string - 4)
                              : 1 == e
                              ? "page1" == o.objSelect.node.name
                                ? o.unSelect(
                                    t,
                                    1 * o.objSelect.number.string + 1
                                  )
                                : "page3" == o.objSelect.node.name
                                ? o.unSelect(t, o.objSelect.number.string - 1)
                                : "page4" == o.objSelect.node.name
                                ? o.unSelect(t, o.objSelect.number.string - 2)
                                : "page5" == o.objSelect.node.name &&
                                  o.unSelect(t, o.objSelect.number.string - 3)
                              : 2 == e
                              ? "page1" == o.objSelect.node.name
                                ? o.unSelect(
                                    t,
                                    1 * o.objSelect.number.string + 2
                                  )
                                : "page2" == o.objSelect.node.name
                                ? o.unSelect(
                                    t,
                                    1 * o.objSelect.number.string + 1
                                  )
                                : "page4" == o.objSelect.node.name
                                ? o.unSelect(t, o.objSelect.number.string - 1)
                                : "page5" == o.objSelect.node.name &&
                                  o.unSelect(t, o.objSelect.number.string - 2)
                              : 3 == e
                              ? "page1" == o.objSelect.node.name
                                ? o.unSelect(
                                    t,
                                    1 * o.objSelect.number.string + 3
                                  )
                                : "page2" == o.objSelect.node.name
                                ? o.unSelect(
                                    t,
                                    1 * o.objSelect.number.string + 2
                                  )
                                : "page3" == o.objSelect.node.name
                                ? o.unSelect(
                                    t,
                                    1 * o.objSelect.number.string + 1
                                  )
                                : "page5" == o.objSelect.node.name &&
                                  o.unSelect(t, o.objSelect.number.string - 1)
                              : 4 == e &&
                                ("page1" == o.objSelect.node.name
                                  ? o.unSelect(
                                      t,
                                      1 * o.objSelect.number.string + 4
                                    )
                                  : "page2" == o.objSelect.node.name
                                  ? o.unSelect(
                                      t,
                                      1 * o.objSelect.number.string + 3
                                    )
                                  : "page3" == o.objSelect.node.name
                                  ? o.unSelect(
                                      t,
                                      1 * o.objSelect.number.string + 2
                                    )
                                  : "page4" == o.objSelect.node.name &&
                                    o.unSelect(
                                      t,
                                      1 * o.objSelect.number.string + 1
                                    )));
                        })
                      );
                    }))
                  : (this.node.active = !1);
            },
            onClickFirst: function () {
              this.controll.get_data();
            },
            onClickPrevious: function () {
              var t = this.objSelect.number.string - 1;
              t > 0 && this.controll.get_data(t);
            },
            onClickPage: function (t) {
              this.controll.get_data(t.target.page);
            },
            onClickNext: function () {
              var t = 1 * this.objSelect.number.string + 1;
              t <= Math.ceil(this.totall / this.kmess) &&
                this.controll.get_data(t);
            },
            onClickLast: function () {
              this.controll.get_data(Math.ceil(this.totall / this.kmess));
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Panel: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "85c4cCaafNLXqFE7/oWLhiQ", "Panel"),
          cc.Class({
            extends: cc.Component,
            properties: {
              header: cc.Node,
              body: cc.Node,
              nodePanel: cc.Node,
              nodeBack: cc.Node,
              buttonToggle: cc.Node,
              yeuCauRutThe: cc.Node,
              yeuCauNapThe: cc.Node,
              quanLyTheCao: cc.Node,
              GiftCode: cc.Node,
              danhSachDaiLy: cc.Node,
              danhSachTranDau: cc.Node,
              doiMatKhau: cc.Node,
              quanLyNguoiDung: cc.Prefab,
              TaiXiu: cc.Prefab,
              BauCua: cc.Prefab,
              XocXoc: cc.Prefab,
              RongHo: cc.Prefab,
              MiniPoker: cc.Prefab,
              Mini3Cay: cc.Prefab,
              BigBabol: cc.Prefab,
              AngryBird: cc.Prefab,
              VuongQuocRed: cc.Prefab,
              Candy: cc.Node,
              LongLan: cc.Node,
              Zeus: cc.Node,
              TamHung: cc.Node,
              XoSo: cc.Node,
              EventTopVip: cc.Node,
              BankList: cc.Node,
              BankRut: cc.Node,
              BankNap: cc.Node,
              HeThong: cc.Node,
              ThongBao: cc.Node,
            },
            init: function () {
              var t = cc.instantiate(this.TaiXiu);
              (t = t.getComponent("TaiXiu")),
                (this.TaiXiu = t),
                this.body.addChild(t.node);
              var e = cc.instantiate(this.BauCua);
              (e = e.getComponent("BauCua")),
                (this.BauCua = e),
                this.body.addChild(e.node);
              var i = cc.instantiate(this.XocXoc);
              (i = i.getComponent("XocXoc")),
                (this.XocXoc = i),
                this.body.addChild(i.node);
              var n = cc.instantiate(this.RongHo);
              (n = n.getComponent("RongHo")),
                (this.RongHo = n),
                this.body.addChild(n.node);
              var o = cc.instantiate(this.MiniPoker);
              (o = o.getComponent("MiniPoker")),
                (this.MiniPoker = o),
                this.body.addChild(o.node);
              var a = cc.instantiate(this.Mini3Cay);
              (a = a.getComponent("Mini3Cay")),
                (this.Mini3Cay = a),
                this.body.addChild(a.node);
              var s = cc.instantiate(this.BigBabol);
              (s = s.getComponent("BigBabol")),
                (this.BigBabol = s),
                this.body.addChild(s.node);
              var c = cc.instantiate(this.AngryBird);
              (c = c.getComponent("AngryBirds")),
                (this.AngryBird = c),
                this.body.addChild(c.node);
              var r = cc.instantiate(this.VuongQuocRed);
              (r = r.getComponent("VuongQuocRed")),
                (this.VuongQuocRed = r),
                this.body.addChild(r.node);
              var h = cc.instantiate(this.quanLyNguoiDung);
              (h = h.getComponent("QuanLyNguoiDung")),
                (this.quanLyNguoiDung = h),
                this.body.addChild(h.node),
                (this.yeuCauRutThe =
                  this.yeuCauRutThe.getComponent("YeuCauRutThe")),
                (this.yeuCauNapThe =
                  this.yeuCauNapThe.getComponent("YeuCauNapThe")),
                (this.quanLyTheCao =
                  this.quanLyTheCao.getComponent("QuanLyTheCao")),
                (this.GiftCode = this.GiftCode.getComponent("GiftCode")),
                (this.danhSachDaiLy =
                  this.danhSachDaiLy.getComponent("DanhSachDaiLy")),
                (this.danhSachTranDau =
                  this.danhSachTranDau.getComponent("DanhSachTranDau")),
                (this.doiMatKhau = this.doiMatKhau.getComponent("DoiMatKhau")),
                (this.Candy = this.Candy.getComponent("Candy")),
                (this.LongLan = this.LongLan.getComponent("LongLan")),
                (this.Zeus = this.Zeus.getComponent("Zeus")),
                (this.TamHung = this.TamHung.getComponent("TamHung")),
                (this.BankList = this.BankList.getComponent("DanhSachBank")),
                (this.BankRut = this.BankRut.getComponent("BankRut")),
                (this.BankNap = this.BankNap.getComponent("BankNap")),
                (this.HeThong = this.HeThong.getComponent("HeThong")),
                (this.EventTopVip =
                  this.EventTopVip.getComponent("EventTopVip")),
                (this.XoSo = this.XoSo.getComponent("XoSo"));
            },
            onLoad: function () {
              var t = this;
              (this.show = !1),
                (this.initMode = this.nodePanel.x),
                (this.actionShow = cc.sequence(
                  cc.moveTo(0.2, cc.v2(this.nodePanel.x + 300, 0)),
                  cc.callFunc(function () {
                    this.buttonToggle.scaleX = 1;
                  }, this)
                )),
                (this.actionHiden = cc.sequence(
                  cc.moveTo(0.2, cc.v2(this.nodePanel.x, 0)),
                  cc.callFunc(function () {
                    this.buttonToggle.scaleX = -1;
                  }, this)
                )),
                Promise.all(
                  this.header.children.map(function (t) {
                    return t.getComponent("itemHeadMenu");
                  })
                ).then(function (e) {
                  t.header = e;
                });
            },
            onPanelClick: function (t, e) {
              cc.RedT.audio.playClick(),
                Promise.all(
                  this.header.map(function (t) {
                    t.node.name == e ? t.select() : t.unselect();
                  })
                ),
                Promise.all(
                  this.body.children.map(function (t) {
                    t.name == e ? (t.active = !0) : (t.active = !1);
                  })
                );
            },
            toggler: function () {
              (this.show = !this.show),
                this.nodePanel.stopAllActions(),
                this.show
                  ? ((this.nodeBack.active = !0),
                    this.nodePanel.runAction(
                      cc.sequence(
                        cc.moveTo(0.2, cc.v2(this.nodePanel.x + 300, 0)),
                        cc.callFunc(function () {
                          this.buttonToggle.scaleX = 1;
                        }, this)
                      )
                    ))
                  : ((this.nodeBack.active = !1),
                    this.nodePanel.runAction(
                      cc.sequence(
                        cc.moveTo(0.2, cc.v2(this.nodePanel.x - 300, 0)),
                        cc.callFunc(function () {
                          this.buttonToggle.scaleX = -1;
                        }, this)
                      )
                    ));
            },
            togglerHiden: function () {
              (this.show = !1),
                (this.nodeBack.active = !1),
                this.nodePanel.stopAllActions(),
                this.nodePanel.runAction(
                  cc.sequence(
                    cc.moveTo(0.2, cc.v2(this.nodePanel.x - 300, 0)),
                    cc.callFunc(function () {
                      this.buttonToggle.scaleX = -1;
                    }, this)
                  )
                );
            },
            isSignOut: function () {
              this.TaiXiu.setLogout(), this.BauCua.setLogout();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    QuanLyNguoiDung_edit: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0e152/9sRFEe4cN28Y7dFGn", "QuanLyNguoiDung_edit");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            inputPhone: { default: null, type: cc.EditBox },
            inputEmail: { default: null, type: cc.EditBox },
            inputCMT: { default: null, type: cc.EditBox },
            inputRED: { default: null, type: cc.EditBox },
            inputXU: { default: null, type: cc.EditBox },
            inputPass: { default: null, type: cc.EditBox },
            toggleBot: { default: null, type: cc.ToggleContainer },
            typeUser: "",
          },
          onDisable: function () {
            this.clear();
          },
          onChangerRED: function (t) {
            (t = n.numberWithCommas(n.getOnlyNumberInString(t))),
              (this.inputRED.string = "0" == t ? "" : t);
          },
          onChangerXU: function (t) {
            (t = n.numberWithCommas(n.getOnlyNumberInString(t))),
              (this.inputXU.string = "0" == t ? "" : t);
          },
          onChangerClick: function () {
            n.isEmpty(this.inputPhone.string) &&
            n.isEmpty(this.inputEmail.string) &&
            n.isEmpty(this.inputCMT.string) &&
            n.isEmpty(this.inputRED.string) &&
            n.isEmpty(this.inputXU.string) &&
            n.isEmpty(this.inputPass.string) &&
            "0" == this.typeUser
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "Kh\xf4ng c\xf3 d\u1eef li\u1ec7u...",
                })
              : cc.RedT.send({
                  users: {
                    update: {
                      id: this.idT,
                      data: {
                        phone: this.inputPhone.string,
                        email: this.inputEmail.string,
                        cmt: this.inputCMT.string,
                        red: this.inputRED.string,
                        xu: this.inputXU.string,
                        pass: this.inputPass.string,
                        type: this.typeUser,
                      },
                    },
                  },
                });
          },
          clear: function () {
            (this.inputPhone.string = ""),
              (this.inputEmail.string = ""),
              (this.inputCMT.string = ""),
              (this.inputRED.string = ""),
              (this.inputXU.string = ""),
              (this.inputPass.string = ""),
              (this.typeUser = "0"),
              Promise.all(
                this.toggleBot.node.children.map(function (t, e) {
                  (t = t.getComponent(cc.Toggle)).node.children[1].active =
                    t.isChecked = 0 == e;
                })
              );
          },
          onChangerBot: function (t) {
            this.typeUser = t.target.name;
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    QuanLyNguoiDung_info: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "2e92fjNx7xBX5bwiaZQc3ll", "QuanLyNguoiDung_info");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            nodeBot: cc.Node,
            nick: cc.Label,
            UID: cc.Label,
            nickname: cc.Label,
            phone: cc.Label,
            email: cc.Label,
            cmt: cc.Label,
            red: cc.Label,
            ketsat: cc.Label,
            redLai: cc.Label,
            redPlay: cc.Label,
            redWin: cc.Label,
            redLost: cc.Label,
            redHu: cc.Label,
            joinedOn: cc.Label,
            vipHT: cc.Label,
            vipTich: cc.Label,
            TX_Red_Play: cc.Label,
            TX_Red_Win: cc.Label,
            TX_Red_Lost: cc.Label,
            TX_Red_Lai: cc.Label,
            TX_Red_DWinH: cc.Label,
            TX_Red_DWin: cc.Label,
            TX_Red_DLostH: cc.Label,
            TX_Red_DLost: cc.Label,
            BC_Red_Win: cc.Label,
            BC_Red_Lost: cc.Label,
            BC_Red_Lai: cc.Label,
            mPoker_Red_Win: cc.Label,
            mPoker_Red_Lost: cc.Label,
            mPoker_Red_Lai: cc.Label,
            mPoker_Hu: cc.Label,
            m3Cay_Red_Win: cc.Label,
            m3Cay_Red_Lost: cc.Label,
            m3Cay_Red_Lai: cc.Label,
            bigBabol_Red_Win: cc.Label,
            bigBabol_Red_Lost: cc.Label,
            bigBabol_Red_Lai: cc.Label,
            bigBabol_Hu: cc.Label,
            Angrybird_Red_Win: cc.Label,
            Angrybird_Red_Lost: cc.Label,
            Angrybird_Red_Lai: cc.Label,
            Angrybird_Hu: cc.Label,
            upDow_Red_Win: cc.Label,
            upDow_Red_Lost: cc.Label,
            upDow_Red_Lai: cc.Label,
            upDow_Hu: cc.Label,
            VQR_Red_Win: cc.Label,
            VQR_Red_Lost: cc.Label,
            VQR_Red_Lai: cc.Label,
            VQR_Hu: cc.Label,
            Candy_Red_Win: cc.Label,
            Candy_Red_Lost: cc.Label,
            Candy_Red_Lai: cc.Label,
            Candy_Hu: cc.Label,
            Long_Red_Win: cc.Label,
            Long_Red_Lost: cc.Label,
            Long_Red_Lai: cc.Label,
            Long_Hu: cc.Label,
            QVT_Red_WIN: cc.Label,
            QVT_Red_Lost: cc.Label,
            QVT_Red_Lai: cc.Label,
            QVT_Hu: cc.Label,
            DuaXe_Red_Win: cc.Label,
            DuaXe_Red_Lost: cc.Label,
            DuaXe_Red_Lai: cc.Label,
            DuaXe_Hu: cc.Label,
            XocXoc_Red_Win: cc.Label,
            XocXoc_Red_Lost: cc.Label,
            XocXoc_Red_Lai: cc.Label,
            RongHo_Red_Win: cc.Label,
            RongHo_Red_Lost: cc.Label,
            RongHo_Red_Lai: cc.Label,
            Poker_Red_Win: cc.Label,
            Poker_Red_Lost: cc.Label,
            Poker_Red_Lai: cc.Label,
          },
          setData: function (t) {
            this.onInfoProfile(t.profile),
              this.onInfoTX(t.taixiu),
              this.onInfoBC(t.baucua),
              this.onInfoMPoker(t.minipoker),
              this.onInfoM3Cay(t.mini3cay),
              this.onInfoBigBabol(t.bigbabol),
              this.onInfoUpDow(t.caothap),
              this.onInfoVQR(t.vqred),
              this.onInfoAngrybird(t.angrybird),
              this.onInfoCandy(t.candy),
              this.onInfoLong(t.longlan),
              this.onInfoQVT(t.tamhung),
              this.onInfoDuaXe(t.zeus),
              this.onInfoXocXoc(t.xocxoc),
              this.onInfoRongHo(t.rongho);
          },
          onInfoProfile: function (t) {
            (this.nodeBot.active = !!t.type),
              (this.nick.string = t.name),
              (this.UID.string = t.UID),
              (this.nickname.string = t.username),
              (this.phone.string = t.phone),
              (this.email.string = t.name),
              (this.cmt.string = t.cmt),
              (this.red.string = n.numberWithCommas(t.red)),
              (this.ketsat.string = n.numberWithCommas(t.ketSat)),
              (this.redPlay.string = n.numberWithCommas(t.redPlay)),
              (this.redWin.string = n.numberWithCommas(t.redWin)),
              (this.redLost.string = n.numberWithCommas(t.redLost)),
              (this.redHu.string = n.numberWithCommas(t.hu));
            var e = t.redWin - t.redLost;
            (this.redLai.string =
              (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.joinedOn.string = n.getStringDateByTime(t.joinedOn)),
              (this.vipHT.string = n.numberWithCommas(
                ((t.redPlay - t.lastVip) / 1e5) >> 0
              )),
              (this.vipTich.string = n.numberWithCommas(t.vip));
          },
          onInfoTX: function (t) {
            var e = t.tWinRed - t.tLostRed;
            (this.TX_Red_Win.string = n.numberWithCommas(t.tWinRed)),
              (this.TX_Red_Lost.string = n.numberWithCommas(t.tLostRed)),
              (this.TX_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.TX_Red_DWinH.string = t.tLineWinRedH),
              (this.TX_Red_DWin.string = t.tLineWinRed),
              (this.TX_Red_DLostH.string = t.tLineLostRedH),
              (this.TX_Red_DLost.string = t.tLineLostRed),
              (this.TX_Red_Play.string = n.numberWithCommas(t.tRedPlay));
          },
          onInfoBC: function (t) {
            var e = t.totall;
            (this.BC_Red_Win.string = n.numberWithCommas(t.win)),
              (this.BC_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.BC_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0));
          },
          onInfoMPoker: function (t) {
            var e = t.win - t.lost;
            (this.mPoker_Red_Win.string = n.numberWithCommas(t.win)),
              (this.mPoker_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.mPoker_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.mPoker_Hu.string = t.hu);
          },
          onInfoM3Cay: function (t) {
            var e = t.win - t.lost;
            (this.m3Cay_Red_Win.string = n.numberWithCommas(t.win)),
              (this.m3Cay_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.m3Cay_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0));
          },
          onInfoBigBabol: function (t) {
            var e = t.win - t.lost;
            (this.bigBabol_Red_Win.string = n.numberWithCommas(t.win)),
              (this.bigBabol_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.bigBabol_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.bigBabol_Hu.string = t.hu);
          },
          onInfoAngrybird: function (t) {
            var e = t.win - t.lost;
            (this.Angrybird_Red_Win.string = n.numberWithCommas(t.win)),
              (this.Angrybird_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.Angrybird_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.Angrybird_Hu.string = t.hu);
          },
          onInfoUpDow: function (t) {
            var e = t.win - t.lost;
            (this.upDow_Red_Win.string = n.numberWithCommas(t.win)),
              (this.upDow_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.upDow_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.upDow_Hu.string = t.hu);
          },
          onInfoVQR: function (t) {
            var e = t.win - t.lost;
            (this.VQR_Red_Win.string = n.numberWithCommas(t.win)),
              (this.VQR_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.VQR_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.VQR_Hu.string = t.hu);
          },
          onInfoCandy: function (t) {
            var e = t.win - t.lost;
            (this.Candy_Red_Win.string = n.numberWithCommas(t.win)),
              (this.Candy_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.Candy_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.Candy_Hu.string = t.hu);
          },
          onInfoLong: function (t) {
            var e = t.win - t.lost;
            (this.Long_Red_Win.string = n.numberWithCommas(t.win)),
              (this.Long_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.Long_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.Long_Hu.string = t.hu);
          },
          onInfoQVT: function (t) {
            var e = t.win - t.lost;
            (this.QVT_Red_WIN.string = n.numberWithCommas(t.win)),
              (this.QVT_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.QVT_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.QVT_Hu.string = t.hu);
          },
          onInfoDuaXe: function (t) {
            var e = t.win - t.lost;
            (this.DuaXe_Red_Win.string = n.numberWithCommas(t.win)),
              (this.DuaXe_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.DuaXe_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0)),
              (this.DuaXe_Hu.string = t.hu);
          },
          onInfoXocXoc: function (t) {
            var e = t.red - t.red_lost;
            (this.XocXoc_Red_Win.string = n.numberWithCommas(t.red)),
              (this.XocXoc_Red_Lost.string = n.numberWithCommas(t.red_lost)),
              (this.XocXoc_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0));
          },
          onInfoRongHo: function (t) {
            var e = t.red - t.red_lost;
            (this.RongHo_Red_Win.string = n.numberWithCommas(t.red)),
              (this.RongHo_Red_Lost.string = n.numberWithCommas(t.red_lost)),
              (this.RongHo_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0));
          },
          onInfoPoker: function (t) {
            var e = t.win - t.lost;
            (this.RongHo_Red_Win.string = n.numberWithCommas(t.win)),
              (this.RongHo_Red_Lost.string = n.numberWithCommas(t.lost)),
              (this.RongHo_Red_Lai.string =
                (e < 0 ? "-" : "+") + n.numberWithCommas(Math.abs(e) >> 0));
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    QuanLyNguoiDung_list: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "2f7d9itfndOGpHV+ZEr7QZW", "QuanLyNguoiDung_list");
        t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            content: cc.Node,
            pages: cc.Prefab,
            inputUID: cc.EditBox,
            inputNick: cc.EditBox,
            inputName: cc.EditBox,
            inputPhone: cc.EditBox,
            inputEmail: cc.EditBox,
            moreMacth: cc.Node,
            nameMacth: cc.Label,
            inputSort: "",
            inputMatch: "",
          },
          onLoad: function () {
            var t = this;
            (this.pages = cc.instantiate(this.pages)),
              (this.pages.y = -345),
              this.node.addChild(this.pages),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this),
              Promise.all(
                this.content.children.map(function (t) {
                  return t.getComponent("itemUsers");
                })
              ).then(function (e) {
                t.content = e;
              });
          },
          onEnable: function () {
            this.get_data();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          onClickFind: function () {
            this.get_data();
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              users: {
                get_users: {
                  uid: this.inputUID.string,
                  nick: this.inputNick.string,
                  name: this.inputName.string,
                  phone: this.inputPhone.string,
                  email: this.inputEmail.string,
                  sort: this.inputSort,
                  macth: this.inputMatch,
                  page: t,
                },
              },
            });
          },
          toggleMacth: function () {
            this.moreMacth.active = !this.moreMacth.active;
          },
          onClickMacth: function (t) {
            this.inputMatch = t.target.name;
            var e = t.target.children[0].getComponent(cc.Label);
            this.nameMacth.string = e.string;
          },
          setData: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    QuanLyNguoiDung: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "068abnmCVFOiL1WBtFgteCF", "QuanLyNguoiDung");
        t("Helper");
        var n = t("QuanLyNguoiDung_list"),
          o = t("QuanLyNguoiDung_info"),
          a = t("QuanLyNguoiDung_edit"),
          s = t("Users_remove"),
          c = t("Users_chuyenred");
        cc.Class({
          extends: cc.Component,
          properties: {
            QuanLyUList: n,
            QuanLyUInfo: o,
            QuanLyUEdit: a,
            UsersRemove: s,
            HistoryChuyen: c,
            active: 1,
          },
          onSelectT: function (t, e) {
            var i =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : null;
            (this.active = "edit" == e || "remove" == e ? 2 : 1),
              i && ((this.QuanLyUEdit.idT = i), (this.active = 1)),
              Promise.all(
                this.node.children.map(function (t) {
                  t.name == e ? (t.active = !0) : (t.active = !1);
                })
              );
          },
          onDisable: function () {
            2 == this.active && this.onSelectT(null, "info");
          },
          onData: function (t) {
            void 0 !== t.get_users && this.QuanLyUList.setData(t.get_users),
              void 0 !== t.get_info && this.QuanLyUInfo.setData(t.get_info),
              t.update,
              void 0 !== t.chuyen && this.HistoryChuyen.onData(t.chuyen),
              t.taixiu && cc.RedT.dialog.HistoryTaiXiu.onData(t.taixiu);
          },
          showHistoryTaixiu: function (t, e) {
            cc.RedT.dialog.showHistoryTaiXiu(t, e);
          },
          onResetVip: function () {
            cc.RedT.send({ users: { resetvip: !0 } });
          },
          onResetTK: function () {
            cc.RedT.send({ users: { resettk: !0 } });
          },
          onResetAll: function () {
            cc.RedT.send({ users: { reset_data: !0 } });
          },
        }),
          cc._RF.pop();
      },
      {
        Helper: "Helper",
        QuanLyNguoiDung_edit: "QuanLyNguoiDung_edit",
        QuanLyNguoiDung_info: "QuanLyNguoiDung_info",
        QuanLyNguoiDung_list: "QuanLyNguoiDung_list",
        Users_chuyenred: "Users_chuyenred",
        Users_remove: "Users_remove",
      },
    ],
    QuanLyTheCao: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "fb649HwyWpLqpDLoPAtTiHj", "QuanLyTheCao"),
          cc.Class({
            extends: cc.Component,
            properties: {
              scrollviewNhaMang: { default: null, type: cc.ScrollView },
              scrollviewMenhGia: { default: null, type: cc.ScrollView },
              prefabNhaMang: { default: null, type: cc.Prefab },
              prefabMenhGia: { default: null, type: cc.Prefab },
            },
            onEnable: function () {
              cc.RedT.send({
                shop: { thecao_get: { menhgia: !0, nhamang: !0 } },
              });
            },
            onNhaMang: function (t) {
              if (
                (this.scrollviewNhaMang.content.destroyAllChildren(), t.length)
              ) {
                var e = this;
                Promise.all(
                  t.map(function (t) {
                    var i = cc.instantiate(e.prefabNhaMang);
                    i.getComponent("itemTheCaoNhaMang").init(t),
                      e.scrollviewNhaMang.content.addChild(i);
                  })
                );
              }
            },
            onMenhGia: function (t) {
              if (
                (this.scrollviewMenhGia.content.destroyAllChildren(), t.length)
              ) {
                var e = this;
                Promise.all(
                  t.map(function (t) {
                    var i = cc.instantiate(e.prefabMenhGia);
                    i.getComponent("itemTheCaoMenhGia").init(t),
                      e.scrollviewMenhGia.content.addChild(i);
                  })
                );
              }
            },
            onData: function (t) {
              void 0 !== t.nhamang && this.onNhaMang(t.nhamang),
                void 0 !== t.menhgia && this.onMenhGia(t.menhgia),
                void 0 !== t.remove && cc.RedT.dialog.onBack();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    RongHo: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ac47318xNpC47TsadwIvO2F", "RongHo");
        var n = (function () {
            function t(t, e) {
              var i = [],
                n = !0,
                o = !1,
                a = void 0;
              try {
                for (
                  var s, c = t[Symbol.iterator]();
                  !(n = (s = c.next()).done) &&
                  (i.push(s.value), !e || i.length !== e);
                  n = !0
                );
              } catch (t) {
                (o = !0), (a = t);
              } finally {
                try {
                  !n && c.return && c.return();
                } finally {
                  if (o) throw a;
                }
              }
              return i;
            }
            return function (e, i) {
              if (Array.isArray(e)) return e;
              if (Symbol.iterator in Object(e)) return t(e, i);
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance"
              );
            };
          })(),
          o = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            labelRong: cc.Label,
            labelHoa: cc.Label,
            labelHo: cc.Label,
            labelRo: cc.Label,
            labelCo: cc.Label,
            labelTep: cc.Label,
            labelBich: cc.Label,
            nodeRong: cc.Node,
            nodeHo: cc.Node,
            nodeHoa: cc.Node,
            nodeRo: cc.Node,
            nodeCo: cc.Node,
            nodeTep: cc.Node,
            nodeBich: cc.Node,
            labelTime: cc.Label,
            number: [cc.Label],
            chat: [cc.Label],
            selectMore: cc.Node,
            selectNumber: cc.Node,
            prefabCuoc: cc.Prefab,
            red: !0,
            get_new: !1,
          },
          ctor: function () {
            (this.ChonChat = null), (this.ChonSo = null), (this.ingame = null);
          },
          onEnable: function () {
            cc.RedT.send({
              rongho: this.get_new ? { view: !0 } : { get_new: !0, view: !0 },
            });
          },
          onDisable: function () {
            cc.RedT.send({ rongho: { view: !1 } });
          },
          onData: function (t) {
            cc.log(t),
              t.info && this.updateInfo(t.info),
              t.ingame && this.xocxocIngame(t.ingame),
              t.dices && this.setDice(t.dices),
              t.finish && this.finish(t.finish),
              t.time_remain &&
                ((this.get_new = !0),
                (this.time_remain = t.time_remain - 1),
                this.playTime());
          },
          updateInfo: function (t) {
            (this.labelRong.string = o.numberWithCommas(t.red.rong)),
              (this.labelHo.string = o.numberWithCommas(t.red.ho)),
              (this.labelHoa.string = o.numberWithCommas(t.red.hoa)),
              (this.labelRo.string = o.numberWithCommas(t.red.ro)),
              (this.labelCo.string = o.numberWithCommas(t.red.co)),
              (this.labelTep.string = o.numberWithCommas(t.red.tep)),
              (this.labelBich.string = o.numberWithCommas(t.red.bich));
          },
          showMore: function (t, e) {
            var i = this.chat[e];
            i === this.ChonChat
              ? (this.selectMore.active = !this.selectMore.active)
              : ((this.ChonChat = i),
                (this.selectMore.active = !0),
                (this.selectMore.x = this.ChonChat.node.parent.x)),
              (this.ChonChat.data = e);
          },
          showNumber: function (t, e) {
            cc.log(e);
            var i = this.number[e];
            i === this.ChonSo
              ? (this.selectNumber.active = !this.selectNumber.active)
              : ((this.ChonSo = i),
                (this.selectNumber.active = !0),
                (this.selectNumber.x = this.ChonSo.node.parent.x)),
              (this.ChonSo.data = e);
          },
          onClickChat: function (t, e) {
            var i = {};
            "\u2666" === e
              ? ((i[this.ChonChat.data] = e),
                (this.ChonChat.node.color = cc.Color.RED),
                (this.ChonChat.string = e))
              : "\u2665" === e
              ? ((i[this.ChonChat.data] = e),
                (this.ChonChat.node.color = cc.Color.RED),
                (this.ChonChat.string = e))
              : ((i[this.ChonChat.data] = e),
                (this.ChonChat.node.color = cc.Color.BLACK),
                (this.ChonChat.string = e)),
              cc.log(i),
              cc.RedT.send({ rongho: { set_dice: i } });
          },
          onClickDice: function (t, e) {
            var i = {};
            "0" === this.ChonSo.data
              ? ((i[3] = e), (this.ChonSo.string = e))
              : "1" === this.ChonSo.data &&
                ((i[4] = e), (this.ChonSo.string = e)),
              cc.RedT.send({ rongho: { set_dice: i } });
          },
          xocxocIngame: function (t) {
            cc.log(t), (this.ingame = t), this.setIngame();
          },
          setIngame: function () {
            if ((this.resetIngame(), this.red)) {
              var t = !0,
                e = !1,
                i = void 0;
              try {
                for (
                  var a, s = Object.entries(this.ingame.red)[Symbol.iterator]();
                  !(t = (a = s.next()).done);
                  t = !0
                ) {
                  var c = a.value,
                    r = n(c, 2),
                    h = r[0],
                    d = r[1],
                    u = null;
                  d.rong > 0 &&
                    (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                      "BauCua_cuoc_item"
                    )).username.string = h),
                    (u.cuoc.string = o.numberWithCommas(d.rong)),
                    this.nodeRong.addChild(u.node)),
                    d.hoa > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.hoa)),
                      this.nodeHoa.addChild(u.node)),
                    d.ho > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.ho)),
                      this.nodeHo.addChild(u.node)),
                    d.ro > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.ro)),
                      this.nodeRo.addChild(u.node)),
                    d.co > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.co)),
                      this.nodeCo.addChild(u.node)),
                    d.tep > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.tep)),
                      this.nodeTep.addChild(u.node)),
                    d.bich > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.bich)),
                      this.nodeBich.addChild(u.node));
                }
              } catch (t) {
                (e = !0), (i = t);
              } finally {
                try {
                  !t && s.return && s.return();
                } finally {
                  if (e) throw i;
                }
              }
            }
          },
          resetIngame: function () {
            this.nodeRong.removeAllChildren(),
              this.nodeHo.removeAllChildren(),
              this.nodeHoa.removeAllChildren(),
              this.nodeRo.removeAllChildren(),
              this.nodeCo.removeAllChildren(),
              this.nodeTep.removeAllChildren(),
              this.nodeBich.removeAllChildren();
          },
          finish: function (t) {
            cc.log(t),
              (this.time_remain = 43),
              this.playTime(),
              this.setDice(t);
          },
          setDice: function (t) {
            cc.log(t);
            (this.number[0].string = t[0]),
              (this.number[1].string = t[1]),
              "\u2666" === t[2]
                ? ((this.chat[0].node.color = cc.Color.RED),
                  (this.chat[0].string = t[2]))
                : "\u2665" === t[2]
                ? ((this.chat[0].node.color = cc.Color.RED),
                  (this.chat[0].string = t[2]))
                : (t[2],
                  (this.chat[0].node.color = cc.Color.BLACK),
                  (this.chat[0].string = t[2])),
              "\u2666" === t[3]
                ? ((this.chat[1].node.color = cc.Color.RED),
                  (this.chat[1].string = t[3]))
                : "\u2665" === t[3]
                ? ((this.chat[1].node.color = cc.Color.RED),
                  (this.chat[1].string = t[3]))
                : (t[3],
                  (this.chat[1].node.color = cc.Color.BLACK),
                  (this.chat[1].string = t[3]));
          },
          resetDice: function (t) {
            cc.log(t);
            (this.number[0].string = "0"),
              (this.number[1].string = "0"),
              (this.chat[0].string = ""),
              (this.chat[1].string = "");
          },
          playTime: function () {
            void 0 !== this.timeInterval && clearInterval(this.timeInterval),
              (this.timeInterval = setInterval(
                function () {
                  if (this.time_remain > -1) {
                    var t = o.numberPad(this.time_remain, 2);
                    (this.labelTime.string = t),
                      this.time_remain < 11
                        ? (this.labelTime.node.color = cc.Color.RED)
                        : (this.labelTime.node.color = cc.Color.WHITE);
                  } else clearInterval(this.timeInterval);
                  this.time_remain--;
                }.bind(this),
                1e3
              ));
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    Shop: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "7c3a2CceMBL14CXynIjq7O1", "Shop"),
          cc.Class({
            extends: cc.Component,
            properties: {
              header: { default: null, type: cc.Node },
              NapRed: { default: null, type: cc.Node },
              TieuRed: { default: null, type: cc.Node },
              ChuyenRed: { default: null, type: cc.Node },
            },
            init: function () {
              var t = this;
              (this.NapRed = this.NapRed.getComponent("NapRed")),
                (this.TieuRed = this.TieuRed.getComponent("TieuRed")),
                (this.ChuyenRed = this.ChuyenRed.getComponent("ChuyenRed")),
                this.NapRed.init(),
                this.TieuRed.init(),
                this.ChuyenRed.init(),
                (this.body = [this.NapRed, this.TieuRed, this.ChuyenRed]),
                Promise.all(
                  this.header.children.map(function (t) {
                    return t.getComponent("itemHeadMenu");
                  })
                ).then(function (e) {
                  t.header = e;
                });
            },
            onSelectHead: function (t, e) {
              Promise.all(
                this.header.map(function (t) {
                  t.node.name == e ? t.select() : t.unselect();
                })
              ),
                Promise.all(
                  this.body.map(function (t) {
                    t.node.name == e
                      ? (t.node.active = !0)
                      : (t.node.active = !1);
                  })
                );
            },
            superView: function (t) {
              "NapRed" == t || "ThongTinNapRed" == t || "QuyDinhNapRed" == t
                ? (this.onSelectHead(null, "NapRed"),
                  "NapRed" != t && this.NapRed.onSelectHead(null, t))
                : ("TieuRed" != t && "MuaXu" != t && "MuaTheNap" != t) ||
                  (this.onSelectHead(null, "TieuRed"),
                  "TieuRed" != t && this.TieuRed.onSelectHead(null, t));
            },
            onData: function (t) {
              void 0 !== t.nap_red && this.NapRed.onData(t.nap_red),
                void 0 !== t.mua_the_nap &&
                  this.TieuRed.MuaTheCao.onData(t.mua_the_nap);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    SignIn: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "27ae3GT9i1NO5Slcyn+NkXQ", "SignIn");
        var n = t("BrowserUtil");
        cc.Class({
          extends: cc.Component,
          properties: {
            username: { default: null, type: cc.EditBox },
            password: { default: null, type: cc.EditBox },
          },
          onLoad: function () {
            var t = this;
            (this.editboxs = [this.username, this.password]),
              (this.keyHandle = function (e) {
                return e.keyCode === cc.macro.KEY.tab
                  ? (t.changeNextFocusEditBox(),
                    e.preventDefault && e.preventDefault(),
                    !1)
                  : e.keyCode === cc.macro.KEY.enter
                  ? (n.focusGame(),
                    t.onSignInClick(),
                    e.preventDefault && e.preventDefault(),
                    !1)
                  : void 0;
              });
          },
          onEnable: function () {
            cc.sys.isBrowser && this.addEvent();
          },
          onDisable: function () {
            cc.sys.isBrowser && this.removeEvent(), this.clean();
          },
          addEvent: function () {
            for (var t in (cc.systemEvent.on(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            ),
            this.editboxs))
              n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener(
                "keydown",
                this.keyHandle,
                !1
              );
          },
          removeEvent: function () {
            for (var t in this.editboxs)
              n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener(
                "keydown",
                this.keyHandle,
                !1
              );
            cc.systemEvent.off(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            );
          },
          onKeyDown: function (t) {
            switch (t.keyCode) {
              case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
              case cc.macro.KEY.enter:
                this.isTop() && this.onSignInClick();
            }
          },
          changeNextFocusEditBox: function () {
            for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
              if (n.checkEditBoxFocus(this.editboxs[e])) {
                n.focusEditBox(this.editboxs[e]), (t = !0);
                break;
              }
            !t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0]);
          },
          isTop: function () {
            return !cc.RedT.notice.node.active && !cc.RedT.loading.active;
          },
          clean: function () {
            this.username.string = this.password.string = "";
          },
          onSignInClick: function () {
            var t = null;
            this.username.string.length > 32 ||
            this.username.string.length < 5 ||
            null === this.username.string.match(new RegExp("^[a-zA-Z0-9]+$"))
              ? (t = "T\xean t\xe0i kho\u1ea3n kh\xf4ng \u0111\xfang!!")
              : (this.password.string.length > 32 ||
                  this.password.string.length < 5) &&
                (t = "M\u1eadt kh\u1ea9u kh\xf4ng \u0111\xfang!!"),
              t
                ? cc.RedT.notice.show({
                    title: "\u0110\u0102NG NH\u1eacP",
                    text: t,
                  })
                : cc.RedT.auth({
                    authentication: {
                      username: this.username.string,
                      password: this.password.string,
                    },
                  });
          },
        }),
          cc._RF.pop();
      },
      { BrowserUtil: "BrowserUtil" },
    ],
    TaiXiu_dashboard_day: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "d8330u3w99GGIFJjzMYGJqI", "TaiXiu_dashboard_day"),
          cc.Class({
            extends: cc.Component,
            properties: { username: cc.Label, dMax: cc.Label, dHT: cc.Label },
          }),
          cc._RF.pop();
      },
      {},
    ],
    TaiXiu_dashboard_top: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "8d285GnvaVKbpjVcc0xqhCI", "TaiXiu_dashboard_top");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            username: cc.Label,
            profitTX: cc.Label,
            tWin: cc.Label,
            tLost: cc.Label,
          },
          setData: function (t) {
            (this.username.string = t.name),
              (this.profitTX.string =
                (t.profitTX < 0 ? "-" : "+") +
                n.numberWithCommas(Math.abs(t.profitTX))),
              (this.tWin.string = n.numberWithCommas(t.tWin)),
              (this.tLost.string = n.numberWithCommas(t.tLost));
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    TaiXiu_dashboard: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3aa1cdO4sRHqrffjeDjyFC0", "TaiXiu_dashboard"),
          cc.Class({
            extends: cc.Component,
            properties: {
              contentTop: cc.Node,
              contentD1: cc.Node,
              contentD2: cc.Node,
              prefabDuDay: cc.Prefab,
              pages: cc.Node,
              inputSort: "",
              red: !0,
            },
            init: function () {
              var t = this;
              Promise.all(
                this.contentTop.children.map(function (t) {
                  return t.getComponent("TaiXiu_dashboard_top");
                })
              ).then(function (e) {
                t.contentTop = e;
              }),
                (this.pages = this.pages.getComponent("Pagination")),
                this.pages.init(this);
            },
            onLoad: function () {},
            onEnable: function () {
              this.get_DuDay(), this.get_data();
            },
            onDisable: function () {},
            changerSort: function (t, e) {
              this.inputSort == e
                ? (this.inputSort = 1 * this.inputSort + 1)
                : (this.inputSort = e),
                this.get_data();
            },
            get_data: function () {
              var t =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : 1;
              cc.RedT.send({
                taixiu: {
                  dashboard: {
                    get_top: { red: this.red, sort: this.inputSort, page: t },
                  },
                },
              });
            },
            get_DuDay: function () {
              arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
              cc.RedT.send({ taixiu: { dashboard: { view: this.red } } });
            },
            setData: function (t) {
              void 0 !== t.get_users && this.setDataTop(t.get_users),
                void 0 !== t.dTXWin && this.dTXWin(t.dTXWin),
                void 0 !== t.dTXLost && this.dTXLost(t.dTXLost);
            },
            setDataTop: function (t) {
              this.pages.onSet(t.page, t.kmess, t.total),
                Promise.all(
                  this.contentTop.map(function (e, i) {
                    var n = t.data[i];
                    void 0 !== n
                      ? ((e.node.active = !0), e.setData(n))
                      : (e.node.active = !1);
                  })
                );
            },
            dTXWin: function (t) {
              this.contentD1.removeAllChildren();
              var e = this;
              Promise.all(
                t.map(function (t, i) {
                  var n = cc.instantiate(e.prefabDuDay);
                  ((n = n.getComponent(
                    "TaiXiu_dashboard_day"
                  )).username.string = t.name),
                    e.red &&
                      ((n.dMax.string = t.tLineWinRed),
                      (n.dHT.string = t.tLineWinRedH)),
                    (n.node.children[0].active = i % 2),
                    e.contentD1.addChild(n.node);
                })
              );
            },
            dTXLost: function (t) {
              this.contentD2.removeAllChildren();
              var e = this;
              Promise.all(
                t.map(function (t, i) {
                  var n = cc.instantiate(e.prefabDuDay);
                  ((n = n.getComponent(
                    "TaiXiu_dashboard_day"
                  )).username.string = t.name),
                    e.red &&
                      ((n.dMax.string = t.tLineLostRed),
                      (n.dHT.string = t.tLineLostRedH)),
                    (n.node.children[0].active = i % 2),
                    e.contentD2.addChild(n.node);
                })
              );
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    TaiXiu_inGame: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "4f475TcDy5P9L2oJ5SpCDu5", "TaiXiu_inGame"),
          cc.Class({
            extends: cc.Component,
            properties: {
              redT: cc.Node,
              redX: cc.Node,
              content: cc.Node,
              itemCuoc: cc.Prefab,
            },
            onLoad: function () {},
            selecList: function (t, e) {
              Promise.all(
                this.content.children.map(function (t) {
                  t.name == e ? (t.active = !0) : (t.active = !1);
                })
              );
            },
            setData: function (t) {
              if ((this.resetData(), t.length)) {
                t.reverse();
                var e = this;
                Promise.all(
                  t.map(function (t) {
                    var i = cc.instantiate(e.itemCuoc);
                    (i = i.getComponent("TaiXiu_itemCuoc")).setData(t),
                      t.select
                        ? e.redT.addChild(i.node)
                        : e.redX.addChild(i.node);
                  })
                );
              }
            },
            resetData: function () {
              this.redT.removeAllChildren(), this.redX.removeAllChildren();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    TaiXiu_itemCuoc: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9ee07aiMVlFj7yJvZk82DZS", "TaiXiu_itemCuoc");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: { time: cc.Label, uname: cc.Label, cuoc: cc.Label },
          setData: function (t) {
            (this.time.string = n.getStringHourByTime(t.time)),
              (this.uname.string = t.name),
              (this.cuoc.string = n.numberWithCommas(t.bet));
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    TaiXiu: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "8aff24xrYxD9adIZA840MLG", "TaiXiu");
        var n = t("Helper"),
          o = t("TaiXiu_inGame"),
          a = t("TaiXiu_dashboard");
        cc.Class({
          extends: cc.Component,
          properties: {
            inGame: o,
            dashboard: a,
            moreInfo: cc.Label,
            red_tai_total: cc.Label,
            red_tai_user: cc.Label,
            red_xiu_total: cc.Label,
            red_xiu_user: cc.Label,
            dice1: cc.Sprite,
            dice2: cc.Sprite,
            dice3: cc.Sprite,
            dices: { default: [], type: cc.SpriteFrame },
            nodeMore: cc.Node,
            nodeNotice: cc.Node,
            notice: { default: null, type: cc.Prefab },
            time: cc.Label,
            phien: cc.Label,
          },
          onLoad: function () {
            (this.dice = this.dice1),
              (this.get_time = !1),
              this.dashboard.init();
          },
          onEnable: function () {
            cc.RedT.send({
              taixiu: this.get_time ? { view: !0 } : { get_time: !0, view: !0 },
            });
          },
          onDisable: function () {
            cc.RedT.send({ taixiu: { view: !1 } });
          },
          changerInfo: function () {
            (this.node.children[0].active = !this.node.children[0].active),
              (this.node.children[1].active = !this.node.children[1].active),
              (this.moreInfo.string = this.node.children[1].active
                ? "T\u1ed5ng Quan"
                : "Trong Game");
          },
          onData: function (t) {
            void 0 !== t.time_remain &&
              ((this.phien.string = "# " + t.phien),
              (this.get_time = !0),
              (this.time_remain = t.time_remain),
              this.playTime()),
              void 0 !== t.dice && this.onDice(t.dice),
              void 0 !== t.finish &&
                ((this.phien.string = "# " + t.finish.phien + 1),
                (this.time_remain = 77),
                this.playTime(),
                (this.nodeMore.active = !1)),
              void 0 !== t.taixiu &&
                ((this.red_tai_total.string = n.numberWithCommas(
                  t.taixiu.red_tai
                )),
                (this.red_tai_user.string = t.taixiu.red_player_tai),
                (this.red_xiu_total.string = n.numberWithCommas(
                  t.taixiu.red_xiu
                )),
                (this.red_xiu_user.string = t.taixiu.red_player_xiu)),
              void 0 !== t.list && this.inGame.setData(t.list),
              void 0 !== t.dashboard && this.dashboard.setData(t.dashboard);
          },
          playTime: function () {
            void 0 !== this.timeInterval && clearInterval(this.timeInterval),
              (this.timeInterval = setInterval(
                function () {
                  this.time_remain > 0
                    ? ((this.time.string =
                        "00:" +
                        n.numberPad(
                          this.time_remain > 61
                            ? this.time_remain - 62
                            : this.time_remain - 1,
                          2
                        )),
                      this.time_remain > 61
                        ? (this.time.node.color = cc.color(255, 0, 0, 255))
                        : (61 == this.time_remain && this.reset(),
                          (this.time.node.color = cc.Color.WHITE)))
                    : clearInterval(this.timeInterval),
                    this.time_remain--;
                }.bind(this),
                1e3
              ));
          },
          selectDice: function (t, e) {
            if (this.time_remain < 62) {
              switch (e) {
                case "dice1":
                  this.dice === this.dice1 && this.nodeMore.active
                    ? (this.nodeMore.active = !1)
                    : ((this.nodeMore.active = !0), (this.dice = this.dice1));
                  break;
                case "dice2":
                  this.dice === this.dice2 && this.nodeMore.active
                    ? (this.nodeMore.active = !1)
                    : ((this.nodeMore.active = !0), (this.dice = this.dice2));
                  break;
                case "dice3":
                  this.dice === this.dice3 && this.nodeMore.active
                    ? (this.nodeMore.active = !1)
                    : ((this.nodeMore.active = !0), (this.dice = this.dice3));
              }
              this.setMore();
            }
          },
          setMore: function () {
            (this.nodeMore.x = this.dice.node.x),
              (this.nodeMore.y = this.dice.node.y + 66);
          },
          setValue: function (t, e) {
            (this.dice.spriteFrame = this.dices[e]), (this.dice.node.name = e);
          },
          setDice: function () {
            if (((this.nodeMore.active = !1), this.time_remain < 62)) {
              var t = 1 * this.dice1.node.name + 1,
                e = 1 * this.dice2.node.name + 1,
                i = 1 * this.dice3.node.name + 1;
              if (isNaN(t) || isNaN(e) || isNaN(i))
                ((n = cc.instantiate(this.notice)).getComponent(
                  "mini_warning"
                ).text.string = "Vui l\xf2ng ch\u1ecdn k\u1ebft qu\u1ea3..."),
                  this.nodeNotice.addChild(n);
              else
                cc.RedT.send({
                  taixiu: { set_dice: { dice1: t, dice2: e, dice3: i } },
                });
            } else {
              var n;
              ((n = cc.instantiate(this.notice)).getComponent(
                "mini_warning"
              ).text.string = "Ch\u1edd phi\xean b\u1eaft \u0111\u1ea7u..."),
                this.nodeNotice.addChild(n);
            }
          },
          onDice: function (t) {
            (this.dice1.spriteFrame =
              this.dices[0 == t.dice1 ? 6 : t.dice1 - 1]),
              (this.dice2.spriteFrame =
                this.dices[0 == t.dice2 ? 6 : t.dice2 - 1]),
              (this.dice3.spriteFrame =
                this.dices[0 == t.dice3 ? 6 : t.dice3 - 1]);
          },
          setLogout: function () {
            this.reset(),
              (this.get_time = !1),
              clearInterval(this.timeInterval);
          },
          onResetTop: function () {
            cc.RedT.send({ taixiu: { dashboard: { resetTop: !0 } } });
          },
          reset: function () {
            this.inGame.resetData(),
              (this.red_tai_total.string =
                this.red_tai_user.string =
                this.red_xiu_total.string =
                this.red_xiu_user.string =
                  0),
              (this.dice1.spriteFrame = this.dices[6]),
              (this.dice2.spriteFrame = this.dices[6]),
              (this.dice3.spriteFrame = this.dices[6]),
              (this.dice1.node.name = "RedT"),
              (this.dice2.node.name = "RedT"),
              (this.dice3.node.name = "RedT");
          },
        }),
          cc._RF.pop();
      },
      {
        Helper: "Helper",
        TaiXiu_dashboard: "TaiXiu_dashboard",
        TaiXiu_inGame: "TaiXiu_inGame",
      },
    ],
    TamHung: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "36c11LN9/9LabkGJebhHoKy", "TamHung");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            chedo: { default: [], type: cc.Toggle },
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
            red: !0,
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ tamhung: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              tamhung: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ tamhung: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ tamhung: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    TieuRed: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "00244bdHdZHHoauw7/tgQlF", "TieuRed"),
          cc.Class({
            extends: cc.Component,
            properties: {
              header: { default: null, type: cc.Node },
              MuaXu: { default: null, type: cc.Node },
              MuaTheCao: { default: null, type: cc.Node },
            },
            init: function () {
              var t = this;
              (this.MuaXu = this.MuaXu.getComponent("shopMuaXu")),
                (this.MuaTheCao = this.MuaTheCao.getComponent("shopMuaTheCao")),
                this.MuaTheCao.init(),
                (this.body = [this.MuaXu, this.MuaTheCao]),
                Promise.all(
                  this.header.children.map(function (t) {
                    return t.getComponent("itemContentMenu");
                  })
                ).then(function (e) {
                  t.header = e;
                });
            },
            onSelectHead: function (t, e) {
              Promise.all(
                this.header.map(function (t) {
                  t.node.name == e ? t.select() : t.unselect();
                })
              ),
                Promise.all(
                  this.body.map(function (t) {
                    t.node.name == e
                      ? (t.node.active = !0)
                      : (t.node.active = !1);
                  })
                );
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Users_chuyenitem: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "4a737ArvmFH34t4CHfSuogc", "Users_chuyenitem"),
          cc.Class({
            extends: cc.Component,
            properties: {
              time: cc.Label,
              from: cc.Label,
              to: cc.Label,
              chuyen: cc.Label,
              nhan: cc.Label,
              nodeMess: cc.Node,
            },
            showMessage: function () {
              cc.RedT.notice.show({
                title: "L\u1eddi nh\u1eafn",
                text: this.message,
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    Users_chuyenred: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "6d2d89CrbhL/aueBU8BOs4u", "Users_chuyenred");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: { pages: cc.Prefab, content: cc.Node },
          onLoad: function () {
            var t = this,
              e = cc.instantiate(this.pages);
            (e.y = -320),
              this.node.addChild(e),
              (this.pages = e.getComponent("Pagination")),
              Promise.all(
                this.content.children.map(function (t) {
                  return t.getComponent("Users_chuyenitem");
                })
              ).then(function (e) {
                t.content = e;
              }),
              this.pages.init(this);
          },
          onEnable: function () {
            this.get_data();
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              users: {
                history: {
                  chuyen: {
                    id: cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUEdit.idT,
                    page: t,
                  },
                },
              },
            });
          },
          onData: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var o = t.data[i];
                  o
                    ? ((e.node.active = !0),
                      (e.time.string = n.getStringDateByTime(o.time)),
                      (e.from.string = o.from),
                      (e.to.string = o.to),
                      (e.chuyen.string = n.numberWithCommas(o.red)),
                      (e.nhan.string = n.numberWithCommas(o.red_c)),
                      o.message
                        ? ((e.nodeMess.active = !0), (e.message = o.message))
                        : ((e.message = ""), (e.nodeMess.active = !1)))
                    : (e.node.active = !1);
                })
              );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    Users_remove: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "4ec28AsKjxEULkxY/NQp5t1", "Users_remove"),
          cc.Class({
            extends: cc.Component,
            properties: { users: cc.Label },
            onEnable: function () {
              this.users.string =
                cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUInfo.nick.string;
            },
            onRemoveClick: function () {
              cc.RedT.send({
                users: {
                  remove: cc.RedT.nodePanel.quanLyNguoiDung.QuanLyUEdit.idT,
                },
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    VuongQuocRed: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "6cc4f8XZ31JkJD9P4gLne3p", "VuongQuocRed");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            chedo: { default: [], type: cc.Toggle },
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
            red: !0,
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ vq_red: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              vq_red: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ vq_red: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ vq_red: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    XoSo_MienBac: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "326dcNQSYxOPa5dTO152EhI", "XoSo_MienBac");
        var n = t("xsmb_cuoc"),
          o = t("xsmb_trathuong");
        cc.Class({
          extends: cc.Component,
          properties: {
            header: cc.Node,
            body: cc.Node,
            MienBac_cuoc: n,
            MienBac_tra: o,
          },
          onSelectType: function (t) {
            var e = t.target.name;
            this.header.children.forEach(function (t) {
              t.name === e
                ? (t.pauseSystemEvents(), (t.opacity = 255))
                : (t.resumeSystemEvents(), (t.opacity = 99));
            }),
              this.body.children.forEach(function (t) {
                t.name === e ? (t.active = !0) : (t.active = !1);
              });
          },
          onData: function (t) {
            t.history && this.MienBac_cuoc.onData(t.history),
              t.kq && this.MienBac_tra.onData(t.kq);
          },
        }),
          cc._RF.pop();
      },
      { xsmb_cuoc: "xsmb_cuoc", xsmb_trathuong: "xsmb_trathuong" },
    ],
    XoSo: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0034fXkeKBE+aGBWyyfOEtG", "XoSo");
        var n = t("XoSo_MienBac");
        cc.Class({
          extends: cc.Component,
          properties: { header: cc.Node, body: cc.Node, MienBac: n },
          onSelectType: function (t) {
            var e = t.target.name;
            this.header.children.forEach(function (t) {
              t.name === e
                ? (t.pauseSystemEvents(), (t.opacity = 255))
                : (t.resumeSystemEvents(), (t.opacity = 99));
            }),
              this.body.children.forEach(function (t) {
                t.name === e ? (t.active = !0) : (t.active = !1);
              });
          },
          onData: function (t) {
            t.mb && this.MienBac.onData(t.mb);
          },
        }),
          cc._RF.pop();
      },
      { XoSo_MienBac: "XoSo_MienBac" },
    ],
    XocXoc: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "6e817SsjdpAZJUkfG/b0bZS", "XocXoc");
        var n = (function () {
            function t(t, e) {
              var i = [],
                n = !0,
                o = !1,
                a = void 0;
              try {
                for (
                  var s, c = t[Symbol.iterator]();
                  !(n = (s = c.next()).done) &&
                  (i.push(s.value), !e || i.length !== e);
                  n = !0
                );
              } catch (t) {
                (o = !0), (a = t);
              } finally {
                try {
                  !n && c.return && c.return();
                } finally {
                  if (o) throw a;
                }
              }
              return i;
            }
            return function (e, i) {
              if (Array.isArray(e)) return e;
              if (Symbol.iterator in Object(e)) return t(e, i);
              throw new TypeError(
                "Invalid attempt to destructure non-iterable instance"
              );
            };
          })(),
          o = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            labelChan: cc.Label,
            labelLe: cc.Label,
            labelRed3: cc.Label,
            labelRed4: cc.Label,
            labelWhite3: cc.Label,
            labelWhite4: cc.Label,
            nodeChan: cc.Node,
            nodeLe: cc.Node,
            nodeRed3: cc.Node,
            nodeRed4: cc.Node,
            nodeWhite3: cc.Node,
            nodeWhite4: cc.Node,
            labelTime: cc.Label,
            coitRed: cc.Node,
            dices: { default: [], type: cc.Sprite },
            iconRed: cc.SpriteFrame,
            iconWhite: cc.SpriteFrame,
            iconThan: cc.SpriteFrame,
            selectMore: cc.Node,
            prefabCuoc: cc.Prefab,
            red: !0,
            get_new: !1,
          },
          ctor: function () {
            (this.selectDice = null), (this.ingame = null);
          },
          onEnable: function () {
            cc.RedT.send({
              xocxoc: this.get_new ? { view: !0 } : { get_new: !0, view: !0 },
            });
          },
          onDisable: function () {
            cc.RedT.send({ xocxoc: { view: !1 } });
          },
          onData: function (t) {
            // console.log(t),
            t.info && this.updateInfo(t.info),
              t.ingame && this.xocxocIngame(t.ingame),
              t.dices && this.setDice(t.dices),
              t.finish && this.finish(t.finish),
              t.time_remain &&
                ((this.get_new = !0),
                (this.time_remain = t.time_remain - 1),
                this.playTime());
          },
          changerCoit: function () {
            (this.red = !this.red),
              (this.coitRed.active = this.red),
              (this.coitXu.active = !this.red);
          },
          updateInfo: function (t) {
            (this.labelChan.string = o.numberWithCommas(t.red.chan)),
              (this.labelLe.string = o.numberWithCommas(t.red.le)),
              (this.labelRed3.string = o.numberWithCommas(t.red.red3)),
              (this.labelRed4.string = o.numberWithCommas(t.red.red4)),
              (this.labelWhite3.string = o.numberWithCommas(t.red.white3)),
              (this.labelWhite4.string = o.numberWithCommas(t.red.white4));
          },
          showMore: function (t, e) {
            var i = this.dices[e];
            i === this.selectDice
              ? (this.selectMore.active = !this.selectMore.active)
              : ((this.selectDice = i),
                (this.selectMore.active = !0),
                (this.selectMore.x = this.selectDice.node.parent.x)),
              (this.selectDice.data = e);
          },
          onClickDice: function (t, e) {
            var i = {};
            "0" === e
              ? ((i[this.selectDice.data] = !1),
                (this.selectDice.spriteFrame = this.iconWhite))
              : ((i[this.selectDice.data] = !0),
                (this.selectDice.spriteFrame = this.iconRed)),
              cc.RedT.send({ xocxoc: { set_dice: i } });
          },
          xocxocIngame: function (t) {
            (this.ingame = t), this.setIngame();
          },
          setIngame: function () {
            if ((this.resetIngame(), this.red)) {
              var t = !0,
                e = !1,
                i = void 0;
              try {
                for (
                  var a, s = Object.entries(this.ingame.red)[Symbol.iterator]();
                  !(t = (a = s.next()).done);
                  t = !0
                ) {
                  var c = a.value,
                    r = n(c, 2),
                    h = r[0],
                    d = r[1],
                    u = null;
                  d.chan > 0 &&
                    (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                      "BauCua_cuoc_item"
                    )).username.string = h),
                    (u.cuoc.string = o.numberWithCommas(d.chan)),
                    this.nodeChan.addChild(u.node)),
                    d.le > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.le)),
                      this.nodeLe.addChild(u.node)),
                    d.red3 > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.red3)),
                      this.nodeRed3.addChild(u.node)),
                    d.red4 > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.red4)),
                      this.nodeRed4.addChild(u.node)),
                    d.white3 > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.white3)),
                      this.nodeWhite3.addChild(u.node)),
                    d.white4 > 0 &&
                      (((u = (u = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = h),
                      (u.cuoc.string = o.numberWithCommas(d.white4)),
                      this.nodeWhite4.addChild(u.node));
                }
              } catch (t) {
                (e = !0), (i = t);
              } finally {
                try {
                  !t && s.return && s.return();
                } finally {
                  if (e) throw i;
                }
              }
            } else {
              var l = !0,
                m = !1,
                g = void 0;
              try {
                for (
                  var p, f = Object.entries(this.ingame.xu)[Symbol.iterator]();
                  !(l = (p = f.next()).done);
                  l = !0
                ) {
                  var b = p.value,
                    C = n(b, 2),
                    v = C[0],
                    _ = C[1],
                    y = null;
                  _.chan > 0 &&
                    (((y = (y = cc.instantiate(this.prefabCuoc)).getComponent(
                      "BauCua_cuoc_item"
                    )).username.string = v),
                    (y.cuoc.string = o.numberWithCommas(_.chan)),
                    this.nodeChan.addChild(y.node)),
                    _.le > 0 &&
                      (((y = (y = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = v),
                      (y.cuoc.string = o.numberWithCommas(_.le)),
                      this.nodeLe.addChild(y.node)),
                    _.red3 > 0 &&
                      (((y = (y = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = v),
                      (y.cuoc.string = o.numberWithCommas(_.red3)),
                      this.nodeRed3.addChild(y.node)),
                    _.red4 > 0 &&
                      (((y = (y = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = v),
                      (y.cuoc.string = o.numberWithCommas(_.red4)),
                      this.nodeRed4.addChild(y.node)),
                    _.white3 > 0 &&
                      (((y = (y = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = v),
                      (y.cuoc.string = o.numberWithCommas(_.white3)),
                      this.nodeWhite3.addChild(y.node)),
                    _.white4 > 0 &&
                      (((y = (y = cc.instantiate(this.prefabCuoc)).getComponent(
                        "BauCua_cuoc_item"
                      )).username.string = v),
                      (y.cuoc.string = o.numberWithCommas(_.white4)),
                      this.nodeWhite4.addChild(y.node));
                }
              } catch (t) {
                (m = !0), (g = t);
              } finally {
                try {
                  !l && f.return && f.return();
                } finally {
                  if (m) throw g;
                }
              }
            }
          },
          resetIngame: function () {
            this.nodeChan.removeAllChildren(),
              this.nodeLe.removeAllChildren(),
              this.nodeRed3.removeAllChildren(),
              this.nodeRed4.removeAllChildren(),
              this.nodeWhite3.removeAllChildren(),
              this.nodeWhite4.removeAllChildren();
          },
          finish: function (t) {
            (this.time_remain = 43), this.playTime(), this.setDice(t);
          },
          setDice: function (t) {
            var e = this;
            this.dices.forEach(function (i, n) {
              var o = t[n];
              i.spriteFrame =
                2 === o ? e.iconThan : o ? e.iconRed : e.iconWhite;
            });
          },
          resetDice: function (t) {
            var e = this;
            this.dices.forEach(function (t, i) {
              t.spriteFrame = e.iconThan;
            });
          },
          playTime: function () {
            void 0 !== this.timeInterval && clearInterval(this.timeInterval),
              (this.timeInterval = setInterval(
                function () {
                  if (this.time_remain > -1) {
                    var t = o.numberPad(this.time_remain, 2);
                    (this.labelTime.string = t),
                      this.time_remain < 11
                        ? (this.labelTime.node.color = cc.Color.RED)
                        : (this.labelTime.node.color = cc.Color.WHITE);
                  } else clearInterval(this.timeInterval);
                  this.time_remain--;
                }.bind(this),
                1e3
              ));
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    YeuCauNapThe_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "6cd520RDhlPd4fAE+oEhkbU", "YeuCauNapThe_item"),
          cc.Class({
            extends: cc.Component,
            properties: {
              time: { default: null, type: cc.Label },
              nickname: { default: null, type: cc.Label },
              nhamang: { default: null, type: cc.Label },
              menhgia: { default: null, type: cc.Label },
              danhan: { default: null, type: cc.Label },
              status: { default: null, type: cc.Label },
            },
            init: function (t) {
              this.controll = t;
            },
            onInfoClick: function () {
              this.controll.getInfo(this),
                this.controll.onSelectT(null, "info");
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    YeuCauNapThe: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "9b095cV4AxKVYogue7nre1n", "YeuCauNapThe");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            content: { default: null, type: cc.Node },
            pagination: { default: null, type: cc.Node },
            time: { default: null, type: cc.Label },
            nickname: { default: null, type: cc.Label },
            nhamang: { default: null, type: cc.Label },
            menhgia: { default: null, type: cc.Label },
            maThe: { default: null, type: cc.Label },
            soSeri: { default: null, type: cc.Label },
            nhan: { default: null, type: cc.Label },
            statusT: { default: null, type: cc.Label },
            isLoad: !1,
          },
          onLoad: function () {
            var t = this;
            (this.status = "-1"),
              (this.statusUpdate = "1"),
              (this.pagination = this.pagination.getComponent("Pagination")),
              Promise.all(
                this.content.children.map(function (t) {
                  return t.getComponent("YeuCauNapThe_item");
                })
              ).then(function (e) {
                t.content = e;
              }),
              this.pagination.init(this);
          },
          onEnable: function () {
            !this.isLoad && this.get_data();
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              nap_the: { get_data: { status: this.status, page: t } },
            });
          },
          onSelectT: function (t, e) {
            Promise.all(
              this.node.children.map(function (t) {
                t.name == e ? (t.active = !0) : (t.active = !1);
              })
            );
          },
          onData: function (t) {
            void 0 !== t.get_data && this.setData(t.get_data),
              void 0 !== t.update && this.updateInfo(t.update),
              t.remove &&
                (this.onSelectT(null, "list"), (this.info.node.active = !1));
          },
          updateInfo: function (t) {
            t.id == this.info.idT &&
              ((this.info.danhan.string = this.nhan.string =
                n.numberWithCommas(t.nhan)),
              (this.statusT.string = this.info.status.string =
                0 == t.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ebb sai"),
              (this.statusT.node.color = this.info.status.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255)));
          },
          getInfo: function (t) {
            (this.info = t),
              (this.time.string = t.time.string),
              (this.nickname.string = t.nickname.string),
              (this.nhamang.string = t.nhamang.string),
              (this.menhgia.string = t.menhgia.string),
              (this.nhan.string = t.danhan.string),
              (this.maThe.string = t.soThe),
              (this.soSeri.string = t.soSeri),
              (this.statusT.string =
                0 == t.statusT
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == t.statusT
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ebb sai"),
              (this.statusT.node.color =
                0 == t.statusT
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.statusT
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          setData: function (t) {
            var e = this;
            this.pagination.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (i, o) {
                  var a = t.data[o];
                  void 0 !== a
                    ? (i.init(e),
                      (i.node.active = !0),
                      (i.idT = a._id),
                      (i.soThe = a.maThe),
                      (i.soSeri = a.seri),
                      (i.statusT = a.status),
                      (i.time.string = n.getStringDateByTime(a.time)),
                      (i.nickname.string = a.name),
                      (i.nhamang.string = a.nhaMang),
                      (i.menhgia.string = n.numberWithCommas(a.menhGia)),
                      (i.danhan.string = n.numberWithCommas(a.nhan)),
                      (i.status.string =
                        0 == a.status
                          ? "Ch\u1edd duy\u1ec7t"
                          : 1 == a.status
                          ? "Th\xe0nh c\xf4ng"
                          : "Th\u1ebb sai"),
                      (i.status.node.color =
                        0 == a.status
                          ? cc.color(45, 171, 255, 255)
                          : 1 == a.status
                          ? cc.color(0, 255, 71, 255)
                          : cc.color(255, 0, 0, 255)))
                    : (i.node.active = !1);
                })
              );
          },
          changerStatus: function (t, e) {
            (this.status = e), this.get_data();
          },
          changerStatusUpdate: function (t, e) {
            this.statusUpdate = e;
          },
          onUpdateClick: function () {
            cc.RedT.send({
              nap_the: {
                update: { id: this.info.idT, status: this.statusUpdate },
              },
            });
          },
          onRemoveClick: function () {
            cc.RedT.dialog.showRemove(event, "napthe", this.info.idT);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    YeuCauRutThe_card: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "5004ek+ngRCt5oYGV9WkN8G", "YeuCauRutThe_card"),
          cc.Class({
            extends: cc.Component,
            properties: {
              nhamang: { default: null, type: cc.Label },
              menhgia: { default: null, type: cc.Label },
              maThe: { default: null, type: cc.Label },
              seri: { default: null, type: cc.Label },
              hetHan: { default: null, type: cc.Label },
              inputMaThe: { default: null, type: cc.EditBox },
              inputSeri: { default: null, type: cc.EditBox },
              inputHetHan: { default: null, type: cc.EditBox },
            },
            onDisable: function () {
              (this.inputMaThe.string = ""),
                (this.inputSeri.string = ""),
                (this.inputHetHan.string = "");
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    YeuCauRutThe_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "2b675mrHZxK94zr0coasA+y", "YeuCauRutThe_item"),
          cc.Class({
            extends: cc.Component,
            properties: {},
            start: function () {},
          }),
          cc._RF.pop();
      },
      {},
    ],
    YeuCauRutThe: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f52719lhqRD1KWntSfVqCzx", "YeuCauRutThe");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            content: { default: null, type: cc.Node },
            pagination: { default: null, type: cc.Node },
            labelStatus: { default: null, type: cc.Label },
            card: { default: null, type: cc.Node },
            isLoad: !1,
          },
          onLoad: function () {
            var t = this;
            (this.status = "-1"),
              (this.statusUpdate = "0"),
              (this.pagination = this.pagination.getComponent("Pagination")),
              Promise.all(
                this.content.children.map(function (t) {
                  return t.getComponent("YeuCauNapThe_item");
                })
              ).then(function (e) {
                t.content = e;
              }),
              Promise.all(
                this.card.children.map(function (t) {
                  return t.getComponent("YeuCauRutThe_card");
                })
              ).then(function (e) {
                t.card = e;
              }),
              this.pagination.init(this);
          },
          onEnable: function () {
            !this.isLoad && this.get_data();
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              mua_the: { get_data: { status: this.status, page: t } },
            });
          },
          getInfo: function (t) {
            (this.item = t),
              (this.labelStatus.string =
                0 == t.statusT
                  ? "Ch\u1edd Duy\u1ec7t"
                  : 1 == t.statusT
                  ? "Th\xe0nh C\xf4ng"
                  : "B\u1ecb Hu\u1ef7"),
              (this.labelStatus.node.color =
                0 == t.statusT
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.statusT
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255)),
              cc.RedT.send({ mua_the: { get_info: t.idT } });
          },
          onSelectT: function (t, e) {
            Promise.all(
              this.node.children.map(function (t) {
                t.name == e ? (t.active = !0) : (t.active = !1);
              })
            );
          },
          onData: function (t) {
            void 0 !== t.get_data && this.setData(t.get_data),
              void 0 !== t.get_info && this.info_get(t.get_info),
              void 0 !== t.update && this.updateInfo(t.update),
              t.remove &&
                (this.onSelectT(null, "list"), (this.item.node.active = !1));
          },
          updateInfo: function (t) {
            var e = this;
            this.item.idT == t.cart &&
              ((this.item.statusT = t.status),
              (this.item.status.string =
                0 == t.status
                  ? "Ch\u1edd Duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh C\xf4ng"
                  : "B\u1ecb Hu\u1ef7"),
              (this.item.status.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255))),
              (this.labelStatus.string =
                0 == t.status
                  ? "Ch\u1edd Duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh C\xf4ng"
                  : "B\u1ecb Hu\u1ef7"),
              (this.labelStatus.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255)),
              void 0 !== t.card &&
                Promise.all(
                  t.card.map(function (t) {
                    Promise.all(
                      e.card.map(function (e) {
                        e.idT == t.id &&
                          (void 0 !== t.card.maThe &&
                            (e.maThe.string = t.card.maThe),
                          void 0 !== t.card.seri &&
                            (e.seri.string = t.card.seri),
                          void 0 !== t.card.time &&
                            (e.hetHan.string = t.card.time));
                      })
                    );
                  })
                );
          },
          info_get: function (t) {
            (this.cart = t.id),
              Promise.all(
                this.card.map(function (e, i) {
                  var o = t.card[i];
                  void 0 !== o
                    ? ((e.idT = o._id),
                      (e.node.active = !0),
                      (e.nhamang.string = o.nhaMang),
                      (e.menhgia.string = n.numberWithCommas(o.menhGia)),
                      (e.maThe.string = o.maThe),
                      (e.seri.string = o.seri),
                      (e.hetHan.string = o.time))
                    : (e.node.active = !1);
                })
              );
          },
          setData: function (t) {
            var e = this;
            this.pagination.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (i, o) {
                  var a = t.data[o];
                  void 0 !== a
                    ? (i.init(e),
                      (i.node.active = !0),
                      (i.idT = a._id),
                      (i.statusT = a.status),
                      (i.time.string = n.getStringDateByTime(a.time)),
                      (i.nickname.string = a.name),
                      (i.nhamang.string = a.nhaMang),
                      (i.menhgia.string = n.numberWithCommas(a.menhGia)),
                      (i.danhan.string = a.soLuong),
                      (i.status.string =
                        0 == a.status
                          ? "Ch\u1edd Duy\u1ec7t"
                          : 1 == a.status
                          ? "Th\xe0nh C\xf4ng"
                          : "B\u1ecb Hu\u1ef7"),
                      (i.status.node.color =
                        0 == a.status
                          ? cc.color(45, 171, 255, 255)
                          : 1 == a.status
                          ? cc.color(0, 255, 71, 255)
                          : cc.color(255, 0, 0, 255)))
                    : (i.node.active = !1);
                })
              );
          },
          changerStatus: function (t, e) {
            this.status !== e && ((this.status = e), this.get_data());
          },
          changerStatusUpdate: function (t, e) {
            this.statusUpdate = e;
          },
          onUpdateClick: function () {
            var t = this;
            new Promise(function (e, i) {
              Promise.all(
                t.card.filter(function (t) {
                  return t.node.active;
                })
              ).then(function (t) {
                Promise.all(
                  t.map(function (t) {
                    var e = { id: t.idT, card: {} };
                    return (
                      n.isEmpty(t.inputMaThe.string) ||
                        (e.card = Object.assign(e.card, {
                          maThe: t.inputMaThe.string,
                        })),
                      n.isEmpty(t.inputSeri.string) ||
                        (e.card = Object.assign(e.card, {
                          seri: t.inputSeri.string,
                        })),
                      n.isEmpty(t.inputHetHan.string) ||
                        (e.card = Object.assign(e.card, {
                          time: t.inputHetHan.string,
                        })),
                      e
                    );
                  })
                ).then(function (t) {
                  Promise.all(
                    t.filter(function (t) {
                      return !!Object.keys(t.card).length;
                    })
                  ).then(function (t) {
                    e(t);
                  });
                });
              });
            }).then(function (e) {
              var i = { cart: t.cart, status: t.statusUpdate };
              e.length && (i = Object.assign(i, { card: e })),
                cc.RedT.send({ mua_the: { update: i } });
            });
          },
          onRemoveClick: function () {
            cc.RedT.dialog.showRemove(event, "rutthe", this.cart);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    Zeus: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "26028iakRlNZ7R1FLXeKGqC", "Zeus");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            name100: cc.Label,
            name1k: cc.Label,
            name10k: cc.Label,
            play100: cc.Label,
            play1k: cc.Label,
            play10k: cc.Label,
            win100: cc.Label,
            win1k: cc.Label,
            win10k: cc.Label,
            lost100: cc.Label,
            lost1k: cc.Label,
            lost10k: cc.Label,
            no100: cc.Label,
            no1k: cc.Label,
            no10k: cc.Label,
            input100: cc.EditBox,
            input1k: cc.EditBox,
            input10k: cc.EditBox,
            chedo: { default: [], type: cc.Toggle },
            content: cc.Node,
            pages: cc.Node,
            inputSort: "",
            red: !0,
          },
          onLoad: function () {
            var t = this;
            Promise.all(
              this.content.children.map(function (t) {
                return t.getComponent("BigBabol_item_top");
              })
            ).then(function (e) {
              t.content = e;
            }),
              (this.pages = this.pages.getComponent("Pagination")),
              this.pages.init(this);
          },
          onEnable: function () {
            cc.RedT.send({ zeus: { get_data: !0 } }), this.get_data();
          },
          onDisable: function () {
            this.reset();
          },
          changerSort: function (t, e) {
            this.inputSort == e
              ? (this.inputSort = 1 * this.inputSort + 1)
              : (this.inputSort = e),
              this.get_data();
          },
          reset: function () {
            this.input100.string =
              this.input1k.string =
              this.input10k.string =
                "";
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              zeus: { get_top: { sort: this.inputSort, page: t } },
            });
          },
          onClickSetName: function (t, e) {
            var i =
              "100" == e
                ? this.input100.string
                : "1000" == e
                ? this.input1k.string
                : this.input10k.string;
            i.length < 3
              ? cc.RedT.notice.show({
                  title: "TH\u1ea4T B\u1ea0I",
                  text: "T\xean kh\xf4ng \u0111\xfang...",
                })
              : cc.RedT.send({ zeus: { name_hu: { name: i, bet: e } } });
          },
          onData: function (t) {
            void 0 !== t.name_hu &&
              ("100" == t.name_hu.bet
                ? (this.name100.string = t.name_hu.name)
                : "1000" == t.name_hu.bet
                ? (this.name1k.string = t.name_hu.name)
                : (this.name10k.string = t.name_hu.name)),
              t.hu && this.dataHU(t.hu),
              void 0 !== t.get_top && this.get_top(t.get_top),
              void 0 !== t.chedo && this.getCheDo(t.chedo);
          },
          dataHU: function (t) {
            var e = t.filter(function (t) {
              return 100 == t.type;
            });
            e = e[0];
            var i = t.filter(function (t) {
              return 1e3 == t.type;
            });
            i = i[0];
            var o = t.filter(function (t) {
              return 1e4 == t.type;
            });
            (o = o[0]),
              (this.name100.string = e.name),
              (this.name1k.string = i.name),
              (this.name10k.string = o.name),
              (this.play100.string = n.numberWithCommas(e.redPlay)),
              (this.play1k.string = n.numberWithCommas(i.redPlay)),
              (this.play10k.string = n.numberWithCommas(o.redPlay)),
              (this.win100.string = n.numberWithCommas(e.redWin)),
              (this.win1k.string = n.numberWithCommas(i.redWin)),
              (this.win10k.string = n.numberWithCommas(o.redWin)),
              (this.lost100.string = n.numberWithCommas(e.redLost)),
              (this.lost1k.string = n.numberWithCommas(i.redLost)),
              (this.lost10k.string = n.numberWithCommas(o.redLost)),
              (this.no100.string = n.numberWithCommas(e.hu)),
              (this.no1k.string = n.numberWithCommas(i.hu)),
              (this.no10k.string = n.numberWithCommas(o.hu));
          },
          get_top: function (t) {
            this.pages.onSet(t.page, t.kmess, t.total),
              Promise.all(
                this.content.map(function (e, i) {
                  var n = t.data[i];
                  void 0 !== n
                    ? ((e.node.active = !0), e.setData(n))
                    : (e.node.active = !1);
                })
              );
          },
          doiCheDo: function (t) {
            (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : null) && cc.RedT.send({ zeus: { chedo: t.target.name } });
          },
          getCheDo: function (t) {
            Promise.all(
              this.chedo.map(function (e, i) {
                e.isChecked = i == t;
              })
            );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_BankAdd: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "646e0nj2zFPW4aErbt1d6V0", "dialog_BankAdd");
        var n = t("Helper").isEmpty;
        cc.Class({
          extends: cc.Component,
          properties: {
            bank: cc.EditBox,
            number: cc.EditBox,
            nameTk: cc.EditBox,
            branch: cc.EditBox,
          },
          onAddClick: function () {
            n(this.bank.string) ||
            n(this.number.string) ||
            n(this.nameTk.string) ||
            n(this.branch.string)
              ? cc.RedT.notice.show({
                  title: "NG\xc2N H\xc0NG",
                  text: "Kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng c\xe1c th\xf4ng tin...",
                })
              : cc.RedT.send({
                  shop: {
                    bank: {
                      add: {
                        bank: this.bank.string,
                        number: this.number.string,
                        name: this.nameTk.string,
                        branch: this.branch.string,
                      },
                    },
                  },
                });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_BankNapAdd: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "8daefC34ONLOZYspA/L5WUG", "dialog_BankNapAdd");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            UID: cc.EditBox,
            bank: cc.EditBox,
            money: cc.EditBox,
            info: cc.EditBox,
            status: "",
          },
          changerStatus: function (t, e) {
            this.status = e;
          },
          onAddClick: function () {
            this.UID.string &&
            this.bank.string &&
            this.money.string &&
            this.info.string
              ? cc.RedT.send({
                  shop: {
                    bank: {
                      napAdd: {
                        uid: this.UID.string,
                        bank: this.bank.string,
                        money: n.getOnlyNumberInString(this.money.string),
                        info: this.info.string,
                        status: this.status,
                      },
                    },
                  },
                })
              : cc.RedT.notice.show({
                  title: "L\u1ed6I",
                  text: "Nh\u1eadp \u0111\u1ea7y \u0111\u1ee7 c\xe1c th\xf4ng tin...",
                });
          },
          onChangerRed: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 0;
            (t = n.numberWithCommas(n.getOnlyNumberInString(t))),
              (this.money.string = 0 == t ? "" : t);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_BankNapRemove: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "5f5d3qhqC5AzILtywSVqk2m", "dialog_BankNapRemove"),
          cc.Class({
            extends: cc.Component,
            onRemoveClick: function () {
              (this.node.parent.idT.active = !1),
                cc.RedT.send({
                  shop: { bank: { napremove: this.node.parent.idT.data._id } },
                });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    dialog_BankNap: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "eee8dNanYxHdqUPRdeUqxEw", "dialog_BankNap");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            labelGD: cc.Label,
            labelTime: cc.Label,
            labelBank: cc.Label,
            labelNap: cc.Label,
            labelKhop: cc.Label,
            labelNick: cc.Label,
            labelName: cc.Label,
            labelNameGo: cc.Label,
            labelSTK: cc.Label,
            labelHinhThuc: cc.Label,
            labelStatus: cc.Label,
          },
          onEnable: function () {
            this.setData(this.node.parent.idT.data);
          },
          setData: function (t) {
            (this.labelGD.string = t.GD),
              (this.labelTime.string = n.getStringDateByTime(t.time)),
              (this.labelBank.string = t.bank.toUpperCase()),
              (this.labelNap.string = n.numberWithCommas(t.money)),
              (this.labelKhop.string = t.info ? t.info : ""),
              (this.labelNick.string = t.nick),
              (this.labelNameGo.string = t.namego ? t.namego : ""),
              (this.labelName.string = t.name),
              (this.labelSTK.string = t.branch ? t.branch : ""),
              (this.labelHinhThuc.string =
                "1" == t.hinhthuc
                  ? "Internet Banking"
                  : "2" == t.hinhthuc
                  ? "ATM"
                  : "Qu\u1ea7y giao d\u1ecbch"),
              (this.labelStatus.string =
                0 == t.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ea5t b\u1ea1i"),
              (this.labelStatus.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          onUpdateClick: function (t, e) {
            this.updateStatus(e),
              this.node.parent.idT.updateStatus(e),
              cc.RedT.send({
                shop: {
                  bank: {
                    updateNap: { id: this.node.parent.idT.data._id, status: e },
                  },
                },
              });
          },
          onRemoveClick: function () {
            cc.RedT.dialog.showBank(event, "nap_remove");
          },
          updateStatus: function (t) {
            (this.labelStatus.string =
              0 == t
                ? "Ch\u1edd duy\u1ec7t"
                : 1 == t
                ? "Th\xe0nh c\xf4ng"
                : "Th\u1ea5t b\u1ea1i"),
              (this.labelStatus.node.color =
                0 == t
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          onCoppyMoney: function () {
            if (cc.sys.isBrowser) {
              var t = document.createElement("textarea");
              (t.value = this.labelNap.string),
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t);
            } else
              jsb.reflection.callStaticMethod(
                "org/cocos2dx/javascript/AppActivity",
                "JavaCopy",
                "(Ljava/lang/String;)V",
                this.labelUID.string
              );
          },
          onCoppyName: function () {
            if (cc.sys.isBrowser) {
              var t = document.createElement("textarea");
              (t.value = this.labelNick.string),
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t);
            } else
              jsb.reflection.callStaticMethod(
                "org/cocos2dx/javascript/AppActivity",
                "JavaCopy",
                "(Ljava/lang/String;)V",
                this.labelUID.string
              );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_BankRemove: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "d64f4BXnHlAlJDjIVgWRXfE", "dialog_BankRemove"),
          cc.Class({
            extends: cc.Component,
            onRemoveClick: function () {
              cc.RedT.send({
                shop: { bank: { remove: this.node.parent.idT } },
              });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    dialog_BankRut: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "c44f5bkszlKNpDKXyzKRDpS", "dialog_BankRut");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            labelGD: cc.Label,
            labelTime: cc.Label,
            labelRut: cc.Label,
            labelBank: cc.Label,
            labelNumber: cc.Label,
            labelName: cc.Label,
            labelBranch: cc.Label,
            labelSoGD: cc.Label,
            labelNick: cc.Label,
            labelStatus: cc.Label,
            info: cc.EditBox,
            status: "",
          },
          onEnable: function () {
            (this.linkObj = this.node.parent.idT),
              this.setData(this.linkObj.data);
          },
          setData: function (t) {
            (this.labelGD.string = t.GD),
              (this.labelTime.string = n.getStringDateByTime(t.time)),
              (this.labelRut.string = n.numberWithCommas(t.money)),
              (this.labelBank.string = t.bank.toUpperCase()),
              (this.labelNumber.string = t.number),
              (this.labelName.string = t.name),
              (this.labelBranch.string = t.branch),
              (this.labelSoGD.string = t.info),
              (this.labelNick.string = t.nick),
              (this.labelStatus.string =
                0 == t.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ea5t b\u1ea1i"),
              (this.labelStatus.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255));
          },
          changerStatus: function (t, e) {
            this.status = e;
          },
          onUpdateClick: function () {
            var t = { id: this.linkObj.data._id, status: this.status };
            this.info.string && (t.info = this.info.string),
              cc.RedT.send({ shop: { bank: { updateRut: t } } });
          },
          onData: function (t) {
            t &&
              ((this.labelSoGD.string = t.info),
              (this.labelStatus.string =
                0 == t.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ea5t b\u1ea1i"),
              (this.labelStatus.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255)),
              (this.linkObj.status.string =
                0 == t.status
                  ? "Ch\u1edd duy\u1ec7t"
                  : 1 == t.status
                  ? "Th\xe0nh c\xf4ng"
                  : "Th\u1ea5t b\u1ea1i"),
              (this.linkObj.status.node.color =
                0 == t.status
                  ? cc.color(45, 171, 255, 255)
                  : 1 == t.status
                  ? cc.color(0, 255, 71, 255)
                  : cc.color(255, 0, 0, 255)));
          },
          onRemoveClick: function () {
            (cc.RedT.dialog.objShow.active = !1),
              cc.RedT.dialog.showRemove(
                event,
                "rutbank",
                this.linkObj.data._id
              );
          },
          onCoppyMoney: function () {
            if (cc.sys.isBrowser) {
              var t = document.createElement("textarea");
              (t.value = this.labelRut.string),
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t);
            } else
              jsb.reflection.callStaticMethod(
                "org/cocos2dx/javascript/AppActivity",
                "JavaCopy",
                "(Ljava/lang/String;)V",
                this.labelUID.string
              );
          },
          onCoppyName: function () {
            if (cc.sys.isBrowser) {
              var t = document.createElement("textarea");
              (t.value = this.labelNick.string),
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t);
            } else
              jsb.reflection.callStaticMethod(
                "org/cocos2dx/javascript/AppActivity",
                "JavaCopy",
                "(Ljava/lang/String;)V",
                this.labelUID.string
              );
          },
          onCoppySTK: function () {
            if (cc.sys.isBrowser) {
              var t = document.createElement("textarea");
              (t.value = this.labelNumber.string),
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t);
            } else
              jsb.reflection.callStaticMethod(
                "org/cocos2dx/javascript/AppActivity",
                "JavaCopy",
                "(Ljava/lang/String;)V",
                this.labelUID.string
              );
          },
          onCoppyCTK: function () {
            if (cc.sys.isBrowser) {
              var t = document.createElement("textarea");
              (t.value = this.labelName.string),
                document.body.appendChild(t),
                t.select(),
                document.execCommand("copy"),
                document.body.removeChild(t);
            } else
              jsb.reflection.callStaticMethod(
                "org/cocos2dx/javascript/AppActivity",
                "JavaCopy",
                "(Ljava/lang/String;)V",
                this.labelUID.string
              );
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_Bank: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "55b3cOJwZVDhZRFp5nKpqxG", "dialog_Bank");
        var n = t("dialog_BankRut");
        cc.Class({
          extends: cc.Component,
          properties: { rut: n },
          show: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            e && (this.node.idT = e),
              Promise.all(
                this.node.children.map(function (e) {
                  e.name == t ? (e.active = !0) : (e.active = !1);
                })
              );
          },
        }),
          cc._RF.pop();
      },
      { dialog_BankRut: "dialog_BankRut" },
    ],
    dialog_DanhSachDaiLy: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "6b5b4RIMOBADJRJbL1XG8oZ", "dialog_DanhSachDaiLy");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            editDaiLy: { default: null, type: cc.EditBox },
            editNick: { default: null, type: cc.EditBox },
            editPhone: { default: null, type: cc.EditBox },
            editLocation: { default: null, type: cc.EditBox },
            editFB: { default: null, type: cc.EditBox },
          },
          show: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            e && (this.idT = e),
              Promise.all(
                this.node.children.map(function (e) {
                  e.name == t ? (e.active = !0) : (e.active = !1);
                })
              );
          },
          onAddClick: function () {
            n.isEmpty(this.editDaiLy.string) ||
            n.isEmpty(this.editNick.string) ||
            n.isEmpty(this.editPhone.string) ||
            n.isEmpty(this.editLocation.string) ||
            n.isEmpty(this.editFB.string)
              ? cc.RedT.notice.show({
                  title: "\u0110\u1ea0I L\xdd",
                  text: "Kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng c\xe1c th\xf4ng tin...",
                })
              : cc.RedT.send({
                  shop: {
                    daily: {
                      add: {
                        name: this.editDaiLy.string,
                        nickname: this.editNick.string,
                        phone: this.editPhone.string,
                        location: this.editLocation.string,
                        fb: this.editFB.string,
                      },
                    },
                  },
                });
          },
          onRemoveClick: function () {
            cc.RedT.send({ shop: { daily: { remove: this.idT } } });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_DanhSachTranDau: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "a20ccXanulCnI3R/Dbo33Ce", "dialog_DanhSachTranDau");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            editGiaiDau: cc.EditBox,
            editDoi1: cc.EditBox,
            editDoi2: cc.EditBox,
            editTeam1Win: cc.EditBox,
            editTeam2Win: cc.EditBox,
            editHoa: cc.EditBox,
            editThoiGian: cc.EditBox,
            editPhut: cc.EditBox,
            editWin: cc.EditBox,
          },
          show: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            e && (this.idT = e),
              Promise.all(
                this.node.children.map(function (e) {
                  e.name == t ? (e.active = !0) : (e.active = !1);
                })
              );
          },
          onAddClick: function () {
            n.isEmpty(this.editGiaiDau.string) ||
            n.isEmpty(this.editDoi1.string) ||
            n.isEmpty(this.editDoi2.string) ||
            n.isEmpty(this.editTeam1Win.string) ||
            n.isEmpty(this.editTeam2Win.string) ||
            n.isEmpty(this.editHoa.string) ||
            n.isEmpty(this.editThoiGian.string)
              ? cc.RedT.notice.show({
                  title: "BOPCLUB",
                  text: "Kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf tr\u1ed1ng c\xe1c th\xf4ng tin...",
                })
              : cc.RedT.send({
                  bongda: {
                    add: {
                      giaidau: this.editGiaiDau.string,
                      doi1: this.editDoi1.string,
                      doi2: this.editDoi2.string,
                      team1win: this.editTeam1Win.string,
                      team2win: this.editTeam2Win.string,
                      hoa: this.editHoa.string,
                      date: this.editThoiGian.string,
                      phut: this.editPhut.string,
                    },
                  },
                });
          },
          onTraThuongClick: function () {
            n.isEmpty(this.editWin.string)
              ? cc.RedT.notice.show({
                  title: "BOPCLUB",
                  text: "Kh\xf4ng \u0111\u01b0\u1ee3c b\u1ecf th\xf4ng tin...",
                })
              : cc.RedT.send({
                  bongda: {
                    trathuong: { win: this.editWin.string, phien: this.idT },
                  },
                });
          },
          onRemoveClick: function () {
            cc.RedT.send({ bongda: { remove: this.idT } });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_GiftCodeAuto: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "d720d13k9xMcLum0YH//mIJ", "dialog_GiftCodeAuto");
        t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            editH: { default: null, type: cc.EditBox },
            editP: { default: null, type: cc.EditBox },
            editSL: { default: null, type: cc.EditBox },
            editGift: { default: null, type: cc.EditBox },
            editRe: { default: null, type: cc.EditBox },
            editReP: { default: null, type: cc.EditBox },
            status: { default: [], type: cc.Toggle },
          },
          onEnable: function () {
            this.onGetAuto();
          },
          onData: function (t) {
            (this.data = t),
              (this.editH.string = t.h),
              (this.editP.string = t.p),
              (this.editSL.string = t.sl),
              (this.editGift.string = t.gift),
              (this.editRe.string = t.re),
              (this.editReP.string = t.reP),
              t.status
                ? ((this.status[0].isChecked = !1),
                  (this.status[1].isChecked = !0))
                : ((this.status[0].isChecked = !0),
                  (this.status[1].isChecked = !1));
          },
          onChangerStatus: function (t) {
            "0" === t.node.name
              ? (this.data.status = !1)
              : (this.data.status = !0);
          },
          onGetAuto: function () {
            cc.RedT.send({ giftcode: { get_auto: !0 } });
          },
          onSaveClick: function () {
            (this.data.h = this.editH.string),
              (this.data.p = this.editP.string),
              (this.data.sl = this.editSL.string),
              (this.data.gift = this.editGift.string),
              (this.data.re = this.editRe.string),
              (this.data.reP = this.editReP.string),
              cc.RedT.send({ giftcode: { get_autoSave: this.data } });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_GiftCode: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "add38vgabRCOK1LEljQGSob", "dialog_GiftCode");
        var n = t("Helper"),
          o = t("dialog_GiftCodeAuto");
        cc.Class({
          extends: cc.Component,
          properties: {
            editGift: { default: null, type: cc.EditBox },
            editMid: { default: null, type: cc.EditBox },
            editRed: { default: null, type: cc.EditBox },
            editXu: { default: null, type: cc.EditBox },
            editNgay: { default: null, type: cc.EditBox },
            editThang: { default: null, type: cc.EditBox },
            editNam: { default: null, type: cc.EditBox },
            auto: o,
          },
          show: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            e && (this.idT = e),
              this.node.children.forEach(function (e) {
                e.name === t ? (e.active = !0) : (e.active = !1);
              });
          },
          onData: function (t) {
            this.auto.onData(t);
          },
          onCheckMid: function () {
            n.isEmpty(this.editMid.string)
              ? cc.RedT.notice.show({
                  title: "GIFT CODE",
                  text: "Y\xeau c\u1ea7u nh\u1eadp m\xe3 chung!!",
                })
              : cc.RedT.send({ giftcode: { checkMid: this.editMid.string } });
          },
          onGetGift: function () {
            cc.RedT.send({ giftcode: { get_gift: !0 } });
          },
          onCreateGift: function () {
            n.isEmpty(this.editGift.string)
              ? cc.RedT.notice.show({
                  title: "GIFT CODE",
                  text: "Y\xeau c\u1ea7u nh\u1eadp GiftCode",
                })
              : n.isEmpty(this.editRed.string) && n.isEmpty(this.editXu.string)
              ? cc.RedT.notice.show({
                  title: "GIFT CODE",
                  text: "Y\xeau c\u1ea7u nh\u1eadp Red ho\u1eb7c Xu",
                })
              : n.isEmpty(this.editNgay.string) ||
                n.isEmpty(this.editThang.string) ||
                n.isEmpty(this.editNam.string)
              ? cc.RedT.notice.show({
                  title: "GIFT CODE",
                  text: "Y\xeau c\u1ea7u nh\u1eadp \u0110\xfang ng\xe0y h\u1ebft h\u1ea1n",
                })
              : cc.RedT.send({
                  giftcode: {
                    create_gift: {
                      giftcode: this.editGift.string,
                      chung: this.editMid.string,
                      red: this.editRed.string,
                      xu: this.editXu.string,
                      ngay: this.editNgay.string,
                      thang: this.editThang.string,
                      nam: this.editNam.string,
                    },
                  },
                });
          },
          onRemoveClick: function () {
            cc.RedT.send({ giftcode: { remove: this.idT } });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper", dialog_GiftCodeAuto: "dialog_GiftCodeAuto" },
    ],
    dialog_QuanLyTheCao: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "45836G85V1J56ffi//00UcT", "dialog_QuanLyTheCao");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            editNhaMang: { default: null, type: cc.EditBox },
            nhaMangCode: cc.EditBox,
            editMenhGia: { default: null, type: cc.EditBox },
            editRed: { default: null, type: cc.EditBox },
            nhamang_nap: { default: null, type: cc.Toggle },
            nhamang_mua: { default: null, type: cc.Toggle },
            menhgia_nap: { default: null, type: cc.Toggle },
            menhgia_mua: { default: null, type: cc.Toggle },
          },
          onDisable: function () {
            this.clear();
          },
          show: function (t) {
            var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : null;
            e && (this.idT = e),
              Promise.all(
                this.node.children.map(function (e) {
                  e.name == t ? (e.active = !0) : (e.active = !1);
                })
              );
          },
          clear: function () {
            this.editNhaMang.string =
              this.nhaMangCode.string =
              this.editMenhGia.string =
              this.editRed.string =
                "";
          },
          onChangerMenhGia: function (t) {
            (t = n.numberWithCommas(n.getOnlyNumberInString(t))),
              (this.editMenhGia.string = "0" == t ? "" : t);
          },
          onChangerRED: function (t) {
            (t = n.numberWithCommas(n.getOnlyNumberInString(t))),
              (this.editRed.string = "0" == t ? "" : t);
          },
          onAddNhaMang: function () {
            n.isEmpty(this.editNhaMang.string) ||
            n.isEmpty(this.nhaMangCode.string) ||
            (!this.nhamang_nap.isChecked && !this.nhamang_mua.isChecked)
              ? cc.RedT.notice.show({
                  title: "NH\xc0 M\u1ea0NG",
                  text: "Th\xf4ng tin kh\xf4ng h\u1ee3p l\u1ec7.",
                })
              : cc.RedT.send({
                  shop: {
                    nhamang: {
                      add: {
                        name: this.editNhaMang.string,
                        value: this.nhaMangCode.string,
                        nap: this.nhamang_nap.isChecked,
                        mua: this.nhamang_mua.isChecked,
                      },
                    },
                  },
                });
          },
          onAddMenhGia: function () {
            n.isEmpty(this.editMenhGia.string) ||
            n.isEmpty(this.editRed.string) ||
            (!this.menhgia_nap.isChecked && !this.menhgia_mua.isChecked)
              ? cc.RedT.notice.show({
                  title: "M\u1ec6NH GI\xc1",
                  text: "Th\xf4ng tin kh\xf4ng h\u1ee3p l\u1ec7.",
                })
              : cc.RedT.send({
                  shop: {
                    menhgia: {
                      add: {
                        name: n.getOnlyNumberInString(this.editMenhGia.string),
                        values: n.getOnlyNumberInString(this.editRed.string),
                        nap: this.menhgia_nap.isChecked,
                        mua: this.menhgia_mua.isChecked,
                      },
                    },
                  },
                });
          },
          removeNhaMang: function () {
            cc.RedT.send({ shop: { nhamang: { remove: this.idT } } });
          },
          removeMenhGia: function () {
            cc.RedT.send({ shop: { menhgia: { remove: this.idT } } });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    dialog_remove: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "a8b3132NvhPjLEPeQ70m7fm", "dialog_remove"),
          cc.Class({
            extends: cc.Component,
            show: function (t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : null;
              (this.acName = t), (this.data = e);
            },
            onRemoveClick: function () {
              var t = {};
              (t[this.acName] = this.data),
                cc.RedT.send({ shop: { remove: t } });
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    inputNumber: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "b256eN/SStPwZz/lPd3MUDm", "inputNumber");
        var n = t("BrowserUtil");
        cc.Class({
          extends: cc.Component,
          properties: {},
          onLoad: function () {
            var t = this;
            (this.editbox = this.node.getComponent(cc.EditBox)),
              (this.onShift = !1),
              (this.eventKeyDown = function (e) {
                16 === e.keyCode && ((t.onShift = !0), e.preventDefault()),
                  (!t.onShift &&
                    ((e.keyCode >= 48 && e.keyCode <= 57) ||
                      (e.keyCode >= 96 && e.keyCode <= 105) ||
                      (e.keyCode >= 37 && e.keyCode <= 40) ||
                      107 === e.keyCode ||
                      109 === e.keyCode ||
                      189 === e.keyCode ||
                      8 === e.keyCode ||
                      13 === e.keyCode)) ||
                    e.preventDefault();
              }),
              (this.eventKeyUp = function (e) {
                16 === e.keyCode && (e.preventDefault(), (t.onShift = !1));
              });
          },
          onEnable: function () {
            cc.sys.isBrowser && this.addEventTT();
          },
          onDisable: function () {
            cc.sys.isBrowser && this.removeEventTT();
          },
          addEventTT: function () {
            n
              .getHTMLElementByEditBox(this.editbox)
              .addEventListener("keydown", this.eventKeyDown, !1),
              n
                .getHTMLElementByEditBox(this.editbox)
                .addEventListener("keyup", this.eventKeyUp, !1);
          },
          removeEventTT: function () {
            n
              .getHTMLElementByEditBox(this.editbox)
              .removeEventListener("keydown", this.eventKeyDown, !1),
              n
                .getHTMLElementByEditBox(this.editbox)
                .removeEventListener("keyup", this.eventKeyUp, !1);
          },
        }),
          cc._RF.pop();
      },
      { BrowserUtil: "BrowserUtil" },
    ],
    itemBank: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ea09dah+7RMurpEKjpmunpt", "itemBank"),
          cc.Class({
            extends: cc.Component,
            properties: {
              bg: cc.Node,
              BANK: cc.Label,
              STK: cc.Label,
              nameSTK: cc.Label,
              BRANCH: cc.Label,
            },
            init: function (t, e) {
              (this.bg.active = t % 2),
                (this.idT = e._id),
                (this.BANK.string = e.bank),
                (this.STK.string = e.number),
                (this.nameSTK.string = e.name),
                (this.BRANCH.string = e.branch);
            },
            onRemoveClick: function (t, e) {
              cc.RedT.dialog.showBank(t, "remove", this.idT);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    itemContentMenu: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "ef328suSpdNvq+JTw+borMJ", "itemContentMenu"),
          cc.Class({
            extends: cc.Component,
            properties: {
              nodeUnSelect: { default: null, type: cc.Node },
              nodeSelect: { default: null, type: cc.Node },
              text: { default: null, type: cc.Node },
            },
            select: function () {
              (this.nodeUnSelect.active = !1),
                (this.nodeSelect.active = !0),
                (this.text.color = cc.Color.BLACK),
                this.node.pauseSystemEvents();
            },
            unselect: function () {
              (this.nodeUnSelect.active = !0),
                (this.nodeSelect.active = !1),
                (this.text.color = cc.Color.WHITE),
                this.node.resumeSystemEvents();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    itemDaiLy: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3c942TKFaBPea39FetpWmvR", "itemDaiLy"),
          cc.Class({
            extends: cc.Component,
            properties: {
              STT: { default: null, type: cc.Label },
              daiLy: { default: null, type: cc.Label },
              nickname: { default: null, type: cc.Label },
              phone: { default: null, type: cc.Label },
              location: { default: null, type: cc.Label },
            },
            init: function (t, e) {
              (this.idT = e._id),
                (this.STT.string = t + 1),
                (this.daiLy.string = e.name),
                (this.nickname.string = e.nickname),
                (this.phone.string = e.phone),
                (this.location.string = e.location);
            },
            onRemoveClick: function (t, e) {
              cc.RedT.dialog.showDaiLy(t, e, this.idT);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    itemHeadMenu: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "b32dagCeD1MVp59ygCz6Tsa", "itemHeadMenu"),
          cc.Class({
            extends: cc.Component,
            properties: { nodeSelect: { default: null, type: cc.Node } },
            select: function () {
              (this.nodeSelect.active = !0), this.node.pauseSystemEvents();
            },
            unselect: function () {
              (this.nodeSelect.active = !1), this.node.resumeSystemEvents();
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    itemTheCaoMenhGia: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "c8688tWfN9P571zzUX0cnDB", "itemTheCaoMenhGia");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            loaiThe: { default: null, type: cc.Label },
            giaTri: { default: null, type: cc.Label },
            NAP: { default: null, type: cc.Label },
            MUA: { default: null, type: cc.Label },
          },
          init: function (t) {
            (this.idT = t._id),
              (this.loaiThe.string = n.numberWithCommas(t.name)),
              (this.giaTri.string = n.numberWithCommas(t.values)),
              (this.NAP.string = t.nap ? "C\xf3" : ""),
              (this.MUA.string = t.mua ? "C\xf3" : "");
          },
          onClickRemove: function (t, e) {
            cc.RedT.dialog.showQLTheCao(t, e, this.idT);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    itemTheCaoNhaMang: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "3a819zAMnhN84yIbLa2xzEc", "itemTheCaoNhaMang"),
          cc.Class({
            extends: cc.Component,
            properties: {
              nhamang: cc.Label,
              code: cc.Label,
              NAP: cc.Label,
              MUA: cc.Label,
            },
            init: function (t) {
              (this.idT = t._id),
                (this.nhamang.string = t.name),
                (this.code.string = t.value),
                (this.NAP.string = t.nap ? "C\xf3" : ""),
                (this.MUA.string = t.mua ? "C\xf3" : "");
            },
            onClickRemove: function (t, e) {
              cc.RedT.dialog.showQLTheCao(t, e, this.idT);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    itemTranDau: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "f0626Gy2ztP657ZfINSAH1v", "itemTranDau"),
          cc.Class({
            extends: cc.Component,
            properties: {
              STT: { default: null, type: cc.Label },
              giaidau: cc.Label,
              doi1: cc.Label,
              doi2: cc.Label,
              tyle: cc.Label,
              trangthai: cc.Label,
              ketqua: cc.Label,
            },
            init: function (t, e) {
              (this.idT = e._id),
                (this.STT.string = t + 1),
                (this.phien = e.phien),
                (this.giaidau.string = e.giaidau),
                (this.doi1.string = e.team1),
                (this.doi2.string = e.team2),
                (this.tyle.string =
                  e.team1win + "|" + e.hoa + "|" + e.team2win),
                (this.trangthai.string = e.status
                  ? "\u0110\xe3 k\u1ebft th\xfac"
                  : "\u0110ang di\u1ec5n ra"),
                (this.ketqua.string = e.status
                  ? e.ketqua
                  : "\u0110ang di\u1ec5n ra");
            },
            onRemoveClick: function (t, e) {
              cc.RedT.dialog.showTranDau(t, e, this.idT);
            },
            onTraThuongClick: function (t, e) {
              cc.RedT.dialog.showTranDau(t, e, this.phien);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    itemUsers: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "fe1a9PuEUlMCaWdBOkjfRia", "itemUsers");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            nodeBot: cc.Node,
            UID: cc.Label,
            nickname: cc.Label,
            nick: cc.Label,
            red: cc.Label,
            xu: cc.Label,
            profit: cc.Label,
            phone: cc.Label,
          },
          onInfoClick: function () {
            cc.RedT.send({ users: { get_info: this.idT } }),
              cc.RedT.nodePanel.quanLyNguoiDung.onSelectT(
                null,
                "info",
                this.idT
              );
          },
          setData: function (t) {
            (this.nodeBot.active = !!t.type),
              (this.idT = t.id),
              (this.UID.string = t.UID),
              (this.nickname.string = t.username),
              (this.nick.string = t.name),
              (this.red.string = n.numberWithCommas(t.red)),
              (this.xu.string = n.numberWithCommas(t.xu)),
              (this.profit.string =
                (t.totall < 0 ? "-" : "+") +
                n.numberWithCommas(Math.abs(t.totall))),
              (this.phone.string = t.phone);
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    mini_warning: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "0b582XKT61IRql1y10ZeY5S", "mini_warning"),
          cc.Class({
            extends: cc.Component,
            properties: { text: { default: null, type: cc.Label } },
            onEnable: function () {
              this.node.runAction(
                cc.sequence(
                  cc.spawn(cc.scaleTo(0.09, 1), cc.fadeTo(0.09, 255)),
                  cc.delayTime(2.5),
                  cc.spawn(cc.scaleTo(0.09, 1.5), cc.fadeTo(0.09, 0)),
                  cc.callFunc(function () {
                    this.node.destroyAllChildren(), this.node.destroy();
                  }, this)
                )
              );
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    shopMuaTheCao: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "36ec7BUYDJJTorK1lfR1/DA", "shopMuaTheCao");
        var n = t("BrowserUtil");
        cc.Class({
          extends: cc.Component,
          properties: {
            NhanhMang: { default: null, type: cc.Label },
            MenhGia: { default: null, type: cc.Label },
            editSoLuong: { default: null, type: cc.EditBox },
            editOTP: { default: null, type: cc.EditBox },
            moreNhaMang: { default: null, type: cc.Node },
            moreMenhGia: { default: null, type: cc.Node },
            scrollviewNhaMang: { default: null, type: cc.ScrollView },
            scrollviewMenhGia: { default: null, type: cc.ScrollView },
            bangGia: { default: null, type: cc.ScrollView },
            prefabLeft: { default: null, type: cc.Prefab },
            prefabRight: { default: null, type: cc.Prefab },
          },
          init: function () {
            var t = this;
            (this.isLoaded = !1),
              (this.editboxs = [this.editSoLuong]),
              (this.keyHandle = function (e) {
                return e.keyCode === cc.macro.KEY.tab
                  ? (t.isTop() && t.changeNextFocusEditBox(),
                    e.preventDefault && e.preventDefault(),
                    !1)
                  : e.keyCode === cc.macro.KEY.enter
                  ? (n.focusGame(),
                    t.onClickMua(),
                    e.preventDefault && e.preventDefault(),
                    !1)
                  : void 0;
              });
          },
          onEnable: function () {
            cc.sys.isBrowser && this.addEvent(),
              this.isLoaded || cc.RedT.send({ shop: { info_mua: !0 } });
          },
          onDisable: function () {
            (this.moreNhaMang.active = this.moreMenhGia.active = !1),
              cc.sys.isBrowser && this.removeEvent(),
              this.clean();
          },
          addEvent: function () {
            for (var t in (cc.systemEvent.on(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            ),
            this.editboxs))
              n.getHTMLElementByEditBox(this.editboxs[t]).addEventListener(
                "keydown",
                this.keyHandle,
                !1
              );
          },
          removeEvent: function () {
            for (var t in this.editboxs)
              n.getHTMLElementByEditBox(this.editboxs[t]).removeEventListener(
                "keydown",
                this.keyHandle,
                !1
              );
            cc.systemEvent.off(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            );
          },
          onKeyDown: function (t) {
            switch (t.keyCode) {
              case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
              case cc.macro.KEY.enter:
                this.isTop() && this.onClickMua();
            }
          },
          changeNextFocusEditBox: function () {
            for (var t = !1, e = 0, i = this.editboxs.length; e < i; e++)
              if (n.checkEditBoxFocus(this.editboxs[e])) {
                i <= ++e && (e = 0), n.focusEditBox(this.editboxs[e]), (t = !0);
                break;
              }
            !t && 0 < this.editboxs.length && n.focusEditBox(this.editboxs[0]);
          },
          isTop: function () {
            return !(
              this.moreNhaMang.active ||
              this.moreMenhGia.active ||
              cc.RedT.notice.node.active ||
              cc.RedT.loading.active
            );
          },
          clean: function () {
            this.editSoLuong.string = "";
          },
          toggleMoreNhaMang: function () {
            (this.moreNhaMang.active = !this.moreNhaMang.active),
              (this.moreMenhGia.active = !1);
          },
          toggleMoreMenhGia: function () {
            this.moreMenhGia.active = !this.moreMenhGia.active;
          },
          onData: function (t) {},
          onClickMua: function () {},
        }),
          cc._RF.pop();
      },
      { BrowserUtil: "BrowserUtil" },
    ],
    shopMuaXu: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "e3d68ruZCVJyZezBdPhX4eo", "shopMuaXu");
        var n = t("Helper"),
          o = t("BrowserUtil");
        cc.Class({
          extends: cc.Component,
          properties: {
            xu: { default: null, type: cc.Label },
            red: { default: null, type: cc.EditBox },
          },
          onLoad: function () {
            var t = this;
            this.keyHandle = function (e) {
              return e.keyCode === cc.macro.KEY.tab
                ? (t.changeNextFocusEditBox(),
                  e.preventDefault && e.preventDefault(),
                  !1)
                : e.keyCode === cc.macro.KEY.enter
                ? (o.focusGame(),
                  t.onClickMua(),
                  e.preventDefault && e.preventDefault(),
                  !1)
                : void 0;
            };
          },
          onEnable: function () {
            cc.sys.isBrowser && this.addEvent();
          },
          onDisable: function () {
            cc.sys.isBrowser && this.removeEvent(), this.clean();
          },
          addEvent: function () {
            cc.systemEvent.on(
              cc.SystemEvent.EventType.KEY_DOWN,
              this.onKeyDown,
              this
            ),
              o
                .getHTMLElementByEditBox(this.red)
                .addEventListener("keydown", this.keyHandle, !1);
          },
          removeEvent: function () {
            o
              .getHTMLElementByEditBox(this.red)
              .removeEventListener("keydown", this.keyHandle, !1),
              cc.systemEvent.off(
                cc.SystemEvent.EventType.KEY_DOWN,
                this.onKeyDown,
                this
              );
          },
          onKeyDown: function (t) {
            switch (t.keyCode) {
              case cc.macro.KEY.tab:
                this.isTop() && this.changeNextFocusEditBox();
                break;
              case cc.macro.KEY.enter:
                this.isTop() && this.onClickMua();
            }
          },
          changeNextFocusEditBox: function () {
            o.focusEditBox(this.red);
          },
          isTop: function () {
            return !cc.RedT.notice.node.active && !cc.RedT.loading.active;
          },
          clean: function () {
            this.red.string = "";
          },
          onChanger: function (t) {
            var e = n.getOnlyNumberInString(t),
              i = n.numberWithCommas(e);
            (this.xu.string = n.numberWithCommas(3 * e)),
              (this.red.string = "0" == i ? "" : i);
          },
          onClickMua: function () {},
        }),
          cc._RF.pop();
      },
      { BrowserUtil: "BrowserUtil", Helper: "Helper" },
    ],
    subMenuControll: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "84987GimdhLo67g4TdXG7dM", "subMenuControll"),
          cc.Class({
            extends: cc.Component,
            properties: {
              items: { default: [], type: cc.Node },
              body: { default: [], type: cc.Node },
            },
            onLoad: function () {
              for (var t in this.items)
                this.items[t] = this.items[t].getComponent("subMenuItem");
            },
            onClickItem: function (t) {
              var e = !0,
                i = !1,
                n = void 0;
              try {
                for (
                  var o, a = this.items[Symbol.iterator]();
                  !(e = (o = a.next()).done);
                  e = !0
                ) {
                  var s = o.value;
                  s.node == t.target ? s.onSelect() : s.offSelect();
                }
              } catch (t) {
                (i = !0), (n = t);
              } finally {
                try {
                  !e && a.return && a.return();
                } finally {
                  if (i) throw n;
                }
              }
              var c = !0,
                r = !1,
                h = void 0;
              try {
                for (
                  var d, u = this.body[Symbol.iterator]();
                  !(c = (d = u.next()).done);
                  c = !0
                ) {
                  var l = d.value;
                  l.name === t.target.name ? (l.active = !0) : (l.active = !1);
                }
              } catch (t) {
                (r = !0), (h = t);
              } finally {
                try {
                  !c && u.return && u.return();
                } finally {
                  if (r) throw h;
                }
              }
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    subMenuItem: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "19618U18J5J55/yKtlBzkGh", "subMenuItem"),
          cc.Class({
            extends: cc.Component,
            properties: {
              background: cc.Node,
              background2: cc.Node,
              text: cc.Node,
            },
            onSelect: function () {
              (this.background.active = !1),
                (this.background2.active = !0),
                (this.text.color = cc.Color.BLACK);
            },
            offSelect: function () {
              (this.background.active = !0),
                (this.background2.active = !1),
                (this.text.color = cc.Color.WHITE);
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    "use_v2.1.x_cc.Action": [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "64833dasNFCrIKhkCggHkVN", "use_v2.1.x_cc.Action"),
          (cc.macro.ROTATE_ACTION_CCW = !0),
          cc._RF.pop();
      },
      {},
    ],
    xsmb_cuoc_item: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "dfd37dfy7pCW6cDODUa0b2R", "xsmb_cuoc_item"),
          cc.Class({
            extends: cc.Component,
            properties: {
              bg: cc.Node,
              time: cc.Label,
              nick: cc.Label,
              loai: cc.Label,
              so: cc.Label,
              diem: cc.Label,
              cuoc: cc.Label,
              win: cc.Label,
            },
          }),
          cc._RF.pop();
      },
      {},
    ],
    xsmb_cuoc: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "636c3ybYAxMFpb76S9djpe0", "xsmb_cuoc");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            page: cc.Prefab,
            content: cc.Node,
            date: cc.Label,
            changerDate: 0,
          },
          onLoad: function () {
            var t = this,
              e = cc.instantiate(this.page);
            (e.y = -341),
              this.node.addChild(e),
              (this.page = e.getComponent("Pagination")),
              this.page.init(this),
              Promise.all(
                this.content.children.map(function (t) {
                  return t.getComponent("xsmb_cuoc_item");
                })
              ).then(function (e) {
                t.content = e;
              });
            var i = new Date();
            this.date.string =
              n.numberPad(i.getDate(), 2) +
              "/" +
              n.numberPad(i.getMonth() + 1, 2) +
              "/" +
              i.getFullYear();
          },
          onEnable: function () {
            this.get_data();
          },
          get_data: function () {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 1;
            cc.RedT.send({
              xs: { mb: { history: { date: this.date.string, page: t } } },
            });
          },
          onData: function (t) {
            var e = this;
            this.page.onSet(t.page, t.kmess, t.total),
              this.content.forEach(function (i, o) {
                var a = t.data[o];
                void 0 !== a
                  ? ((i.node.active = !0),
                    (i.bg.active = o % 2),
                    (i.time.string = n.getStringDateByTime(a.time)),
                    (i.nick.string = a.name),
                    (i.loai.string = e.getLoai(a.type)),
                    (i.so.string = a.so.join(", ")),
                    (i.diem.string = n.numberWithCommas(a.diem)),
                    (i.cuoc.string = n.numberWithCommas(a.cuoc)),
                    (i.win.string = n.numberWithCommas(a.win)))
                  : (i.node.active = !1);
              });
          },
          dateNext: function () {
            this.changerDate++, this.dateChanger();
          },
          datePre: function () {
            this.changerDate--, this.dateChanger();
          },
          dateChanger: function () {
            var t = new Date();
            t.setDate(t.getDate() + this.changerDate),
              (this.date.string =
                n.numberPad(t.getDate(), 2) +
                "/" +
                n.numberPad(t.getMonth() + 1, 2) +
                "/" +
                t.getFullYear()),
              this.get_data();
          },
          getLoai: function (t) {
            switch (t) {
              case "lo2":
                return "L\xf4 2 S\u1ed1";
              case "lo21k":
                return "L\xf4 2 S\u1ed1 1k";
              case "lo3":
                return "L\xf4 3 S\u1ed1";
              case "lo4":
                return "L\xf4 4 S\u1ed1";
              case "xien2":
                return "Xi\xean 2";
              case "xien3":
                return "Xi\xean 3";
              case "xien4":
                return "Xi\xean 4";
              case "de":
                return "\u0110\u1ec1";
              case "daude":
                return "\u0110\u1ea7u \u0110\u1ec1";
              case "degiai7":
                return "\u0110\u1ec1 Gi\u1ea3i 7";
              case "degiai1":
                return "\u0110\u1ec1 Gi\u1ea3i Nh\u1ea5t";
              case "3cang":
                return "3 C\xe0ng";
              case "4cang":
                return "4 C\xe0ng";
              case "dau":
                return "\u0110\u1ea7u";
              case "duoi":
                return "\u0110u\xf4i";
              case "truot4":
                return "Tr\u01b0\u1ee3t 4";
              case "truot8":
                return "Tr\u01b0\u1ee3t 8";
              case "truot10":
                return "Tr\u01b0\u1ee3t 10";
            }
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
    xsmb_trathuong: [
      function (t, e, i) {
        "use strict";
        cc._RF.push(e, "cbcd0VFcdJLmplnfLfhfq2u", "xsmb_trathuong");
        var n = t("Helper");
        cc.Class({
          extends: cc.Component,
          properties: {
            date: cc.Label,
            changerDate: 0,
            giai1: cc.EditBox,
            giai2: { default: [], type: cc.EditBox },
            giai3: { default: [], type: cc.EditBox },
            giai4: { default: [], type: cc.EditBox },
            giai5: { default: [], type: cc.EditBox },
            giai6: { default: [], type: cc.EditBox },
            giai7: { default: [], type: cc.EditBox },
            giaiDB: cc.EditBox,
            notice: cc.Node,
            nPrefab: cc.Prefab,
          },
          onLoad: function () {
            var t = new Date();
            (this.date.string =
              n.numberPad(t.getDate(), 2) +
              "/" +
              n.numberPad(t.getMonth() + 1, 2) +
              "/" +
              t.getFullYear()),
              this.get_data();
          },
          get_data: function () {
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
            cc.RedT.send({ xs: { mb: { getdate: this.date.string } } });
          },
          dateNext: function () {
            this.changerDate++, this.dateChanger();
          },
          datePre: function () {
            this.changerDate--, this.dateChanger();
          },
          dateChanger: function () {
            var t = new Date();
            t.setDate(t.getDate() + this.changerDate),
              (this.date.string =
                n.numberPad(t.getDate(), 2) +
                "/" +
                n.numberPad(t.getMonth() + 1, 2) +
                "/" +
                t.getFullYear()),
              this.reset(),
              this.get_data();
          },
          onData: function (t) {
            t.date && this.dataDate(t.date),
              t.notice && this.addNotice(t.notice);
          },
          addNotice: function (t) {
            var e = cc.instantiate(this.nPrefab);
            ((e = e.getComponent("mini_warning")).text.string = t),
              this.notice.addChild(e.node);
          },
          reset: function () {
            (this.giai1.string = ""),
              this.giai2.forEach(function (t) {
                t.string = "";
              }),
              this.giai3.forEach(function (t) {
                t.string = "";
              }),
              this.giai4.forEach(function (t) {
                t.string = "";
              }),
              this.giai5.forEach(function (t) {
                t.string = "";
              }),
              this.giai6.forEach(function (t) {
                t.string = "";
              }),
              this.giai7.forEach(function (t) {
                t.string = "";
              }),
              (this.giaiDB.string = "");
          },
          dataDate: function (t) {
            (this.giai1.string = t.g1),
              this.giai2.forEach(function (e, i) {
                e.string = t.g2[i] ? t.g2[i] : "";
              }),
              this.giai3.forEach(function (e, i) {
                e.string = t.g3[i] ? t.g3[i] : "";
              }),
              this.giai4.forEach(function (e, i) {
                e.string = t.g4[i] ? t.g4[i] : "";
              }),
              this.giai5.forEach(function (e, i) {
                e.string = t.g5[i] ? t.g5[i] : "";
              }),
              this.giai6.forEach(function (e, i) {
                e.string = t.g6[i] ? t.g6[i] : "";
              }),
              this.giai7.forEach(function (e, i) {
                e.string = t.g7[i] ? t.g7[i] : "";
              }),
              (this.giaiDB.string = t.gdb);
          },
          onUpdateKQ: function () {
            var t = this.giai2.map(function (t) {
                return t.string;
              }),
              e = this.giai3.map(function (t) {
                return t.string;
              }),
              i = this.giai4.map(function (t) {
                return t.string;
              }),
              n = this.giai5.map(function (t) {
                return t.string;
              }),
              o = this.giai6.map(function (t) {
                return t.string;
              }),
              a = this.giai7.map(function (t) {
                return t.string;
              });
            cc.RedT.send({
              xs: {
                mb: {
                  update: {
                    date: this.date.string,
                    giai1: this.giai1.string,
                    giaidb: this.giaiDB.string,
                    giai2: t,
                    giai3: e,
                    giai4: i,
                    giai5: n,
                    giai6: o,
                    giai7: a,
                  },
                },
              },
            });
          },
          onTraThuong: function () {
            cc.RedT.send({ xs: { mb: { trathuong: this.date.string } } });
          },
        }),
          cc._RF.pop();
      },
      { Helper: "Helper" },
    ],
  },
  {},
  [
    "BaseGame",
    "BrowserUtil",
    "Config",
    "DisableClick",
    "Helper",
    "MainAudio",
    "itemContentMenu",
    "itemHeadMenu",
    "Pagination",
    "Pagination_item",
    "mini_warning",
    "inputNumber",
    "subMenuControll",
    "subMenuItem",
    "MainGame",
    "dialog_Bank",
    "dialog_BankAdd",
    "dialog_BankNap",
    "dialog_BankNapAdd",
    "dialog_BankNapRemove",
    "dialog_BankRemove",
    "dialog_BankRut",
    "dialog_DanhSachDaiLy",
    "dialog_DanhSachTranDau",
    "Dialog",
    "EventAngryBird",
    "EventBigBabol",
    "EventMiniPoker",
    "EventVip",
    "dialog_GiftCode",
    "dialog_GiftCodeAuto",
    "HistoryTXitem",
    "HistoryTaiXiu",
    "dialog_QuanLyTheCao",
    "dialog_remove",
    "ChuyenRed",
    "ChuyenRed_daily",
    "NapRed",
    "NapRed_itemOne",
    "NapRed_itemTT",
    "Shop",
    "shopMuaTheCao",
    "shopMuaXu",
    "TieuRed",
    "Header",
    "Notice",
    "AngryBirds",
    "BankNap",
    "BankNap_item",
    "BankRut",
    "BankRut_item",
    "BauCua",
    "BauCua_cuoc_item",
    "BauCua_inGame",
    "BigBabol",
    "BigBabol_item_top",
    "Candy",
    "DanhSachBank",
    "itemBank",
    "DanhSachDaiLy",
    "itemDaiLy",
    "DanhSachTranDau",
    "itemTranDau",
    "DoiMatKhau",
    "GiftCode",
    "GiftCode_item",
    "HeThong",
    "LongLan",
    "Mini3Cay",
    "MiniPoker",
    "Panel",
    "QuanLyNguoiDung_list",
    "QuanLyNguoiDung",
    "Users_chuyenitem",
    "Users_chuyenred",
    "QuanLyNguoiDung_edit",
    "QuanLyNguoiDung_info",
    "itemUsers",
    "Users_remove",
    "itemTheCaoMenhGia",
    "itemTheCaoNhaMang",
    "QuanLyTheCao",
    "RongHo",
    "TaiXiu",
    "TaiXiu_dashboard",
    "TaiXiu_dashboard_day",
    "TaiXiu_dashboard_top",
    "TaiXiu_inGame",
    "TaiXiu_itemCuoc",
    "TamHung",
    "EVipPoint_item",
    "EventTopVip",
    "VuongQuocRed",
    "XoSo_MienBac",
    "xsmb_cuoc",
    "xsmb_cuoc_item",
    "xsmb_trathuong",
    "XoSo",
    "XocXoc",
    "YeuCauNapThe",
    "YeuCauNapThe_item",
    "YeuCauRutThe",
    "YeuCauRutThe_card",
    "YeuCauRutThe_item",
    "Zeus",
    "SignIn",
    "use_v2.1.x_cc.Action",
  ]
);
