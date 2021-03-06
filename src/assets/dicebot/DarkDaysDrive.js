/* Generated by Opal 0.10.5 */
(function(Opal) {
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_ge(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs >= rhs : lhs['$>='](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $gvars = Opal.gvars, $hash2 = Opal.hash2;

  Opal.add_stubs(['$==', '$<=', '$>=', '$upcase', '$===', '$getRandomSkillTableResult', '$getTableDiceCommandResult', '$get_table_by_1d6', '$get_table_by_2d6', '$[]', '$nil?', '$getD66Table', '$get_table_by_d66_swap', '$getD66', '$bcdice', '$get_table_by_number', '$map', '$kind_of?', '$to_i', '$setPrefixes', '$+', '$keys']);
  return (function($base, $super) {
    function $DarkDaysDrive(){};
    var self = $DarkDaysDrive = $klass($base, $super, 'DarkDaysDrive', $DarkDaysDrive);

    var def = self.$$proto, $scope = self.$$scope, TMP_1, TMP_2, TMP_3, TMP_4, TMP_5, TMP_6, TMP_7, TMP_8, TMP_10, $a;

    Opal.defn(self, '$initialize', TMP_1 = function $$initialize() {
      var $a, $b, self = this, $iter = TMP_1.$$p, $yield = $iter || nil, $zuper = nil, $zuper_index = nil, $zuper_length = nil;

      TMP_1.$$p = null;
      $zuper = [];
      
      for($zuper_index = 0; $zuper_index < arguments.length; $zuper_index++) {
        $zuper[$zuper_index] = arguments[$zuper_index];
      }
      ($a = ($b = self, Opal.find_super_dispatcher(self, 'initialize', TMP_1, false)), $a.$$p = $iter, $a).apply($b, $zuper);
      return self.d66Type = 2;
    }, TMP_1.$$arity = 0);

    Opal.defn(self, '$gameName', TMP_2 = function $$gameName() {
      var self = this;

      return "ダークデイズドライブ";
    }, TMP_2.$$arity = 0);

    Opal.defn(self, '$gameType', TMP_3 = function $$gameType() {
      var self = this;

      return "DarkDaysDrive";
    }, TMP_3.$$arity = 0);

    Opal.defn(self, '$getHelpMessage', TMP_4 = function $$getHelpMessage() {
      var self = this;

      return "・判定\nスペシャル／ファンブル／成功／失敗を判定\n・各種表\nRTT\tランダム特技決定表\nABRT アビリティ決定表\nDT ダメージ表\nFT 失敗表\nGJT 大成功表\nITT 移動トラブル表\nNTT 任務トラブル表\nSTT 襲撃トラブル表\nHTT 変身トラブル表\nDET ドライブイベント表\nBET ブレイクイベント表\nCT キャンプ表\nKZT 関係属性表\n・D66ダイスあり\n";
    }, TMP_4.$$arity = 0);

    Opal.defn(self, '$check_2D6', TMP_5 = function $$check_2D6(total_n, dice_n, signOfInequality, diff, dice_cnt, dice_max, n1, n_max) {
      var $a, self = this, output = nil;

      if ((($a = (signOfInequality['$=='](">="))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        } else {
        return ""
      };
      output = (function() {if ((($a = ($rb_le(dice_n, 2))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ ファンブル(判定失敗。失敗表(FT)を追加で１回振る)"
      } else if ((($a = ($rb_ge(dice_n, 12))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ スペシャル(判定成功。大成功表(GJT)を１回使用可能)"
      } else if ((($a = ($rb_ge(total_n, diff))) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return " ＞ 成功"
        } else {
        return " ＞ 失敗"
      }; return nil; })();
      return output;
    }, TMP_5.$$arity = 8);

    Opal.defn(self, '$rollDiceCommand', TMP_6 = function $$rollDiceCommand(command) {
      var self = this, string = nil, $case = nil;

      string = command.$upcase();
      $case = string;if ("RTT"['$===']($case)) {return self.$getRandomSkillTableResult(command)};
      return self.$getTableDiceCommandResult(command);
    }, TMP_6.$$arity = 1);

    Opal.defn(self, '$getRandomSkillTableResult', TMP_7 = function $$getRandomSkillTableResult(command) {
      var $a, $b, self = this, name = nil, skillTableFull = nil, skillTable = nil, total_n = nil, tableName = nil, skill = nil, total_n2 = nil, output = nil;

      name = "ランダム";
      skillTableFull = [["背景", ["呪い", "絶望", "孤児", "死別", "一般人", "獲物", "憧れ", "友人", "挑戦者", "血縁", "永遠"]], ["仕事", ["脅迫", "捨てる", "拉致", "盗む", "ハッキング", "侵入", "変装", "だます", "隠す", "のぞく", "聞き出す"]], ["捜索", ["トイレ", "食事", "自然", "運動施設", "街", "友愛会", "暗部", "史跡", "文化施設", "温泉", "宿泊"]], ["趣味", ["お酒", "グルメ", "ダンス", "スポーツ", "健康", "ファッション", "恋愛", "フェス", "音楽", "物語", "学問"]], ["雰囲気", ["だらしない", "のんびり", "暖かい", "明るい", "甘い", "普通", "洗練", "渋い", "静か", "真面目", "冷たい"]], ["戦闘法", ["忍術", "古武術", "剣術", "棒術", "拳法", "ケンカ", "総合格闘技", "レスリング", "軍隊格闘術", "射撃", "弓術"]]];
      $b = self.$get_table_by_1d6(skillTableFull), $a = Opal.to_ary($b), skillTable = ($a[0] == null ? nil : $a[0]), total_n = ($a[1] == null ? nil : $a[1]), $b;
      $b = skillTable, $a = Opal.to_ary($b), tableName = ($a[0] == null ? nil : $a[0]), skillTable = ($a[1] == null ? nil : $a[1]), $b;
      $b = self.$get_table_by_2d6(skillTable), $a = Opal.to_ary($b), skill = ($a[0] == null ? nil : $a[0]), total_n2 = ($a[1] == null ? nil : $a[1]), $b;
      output = "" + (name) + "指定特技表(" + (total_n) + "," + (total_n2) + ") ＞ 『" + (tableName) + "』" + (skill);
      return output;
    }, TMP_7.$$arity = 1);

    Opal.defn(self, '$getTableDiceCommandResult', TMP_8 = function $$getTableDiceCommandResult(command) {
      var $a, $b, self = this, info = nil, name = nil, type = nil, table = nil, $case = nil, isSwap = nil, number = nil, result = nil, text = nil;

      info = (($a = Opal.cvars['@@tables']) == null ? nil : $a)['$[]'](command);
      if ((($a = info['$nil?']()) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return nil};
      name = info['$[]']("name");
      type = info['$[]']("type");
      table = info['$[]']("table");
      $b = (function() {$case = type;if ("2D6"['$===']($case)) {return self.$get_table_by_2d6(table)}else if ("1D6"['$===']($case)) {return self.$get_table_by_1d6(table)}else if ("D66S"['$===']($case)) {table = self.$getD66Table(table);
      return self.$get_table_by_d66_swap(table);}else if ("D66N"['$===']($case)) {table = self.$getD66Table(table);
      isSwap = false;
      number = self.$bcdice().$getD66(isSwap);
      result = self.$get_table_by_number(number, table);
      return [result, number];}else {return nil}})(), $a = Opal.to_ary($b), text = ($a[0] == null ? nil : $a[0]), number = ($a[1] == null ? nil : $a[1]), $b;
      if ((($a = (text['$nil?']())) !== nil && $a != null && (!$a.$$is_boolean || $a == true))) {
        return nil};
      return "" + (name) + "(" + (number) + ") ＞ " + (text);
    }, TMP_8.$$arity = 1);

    Opal.defn(self, '$getD66Table', TMP_10 = function $$getD66Table(table) {
      var $a, $b, TMP_9, self = this;

      return ($a = ($b = table).$map, $a.$$p = (TMP_9 = function(item){var self = TMP_9.$$s || this, $c, $d;
if (item == null) item = nil;
      if ((($c = ($d = item['$kind_of?']($scope.get('String')), $d !== false && $d !== nil && $d != null ?/^(\d+):(.*)/['$==='](item) : $d)) !== nil && $c != null && (!$c.$$is_boolean || $c == true))) {
          return [(($c = $gvars['~']) === nil ? nil : $c['$[]'](1)).$to_i(), (($c = $gvars['~']) === nil ? nil : $c['$[]'](2))]
          } else {
          return item
        }}, TMP_9.$$s = self, TMP_9.$$arity = 1, TMP_9), $a).call($b);
    }, TMP_10.$$arity = 1);

    (Opal.cvars['@@tables'] = $hash2(["ABRT", "DT", "FT", "GJT", "ITT", "NTT", "STT", "HTT", "DET", "BET", "CT", "KZT"], {"ABRT": $hash2(["name", "type", "table"], {"name": "アビリティ決定表", "type": "D66S", "table": ["11:インストラクター(P155)", "12:運送業(P155)", "13:運転手(P155)", "14:カフェ店員(P155)", "15:趣味人(P155)", "16:ショップ店員(P155)", "22:正社員(P156)", "23:大工(P156)", "24:探偵(P156)", "25:バイヤー(P156)", "26:俳優(P156)", "33:派遣社員(P156)", "34:犯罪者(P157)", "35:バンドマン(P157)", "36:バーテンダー(P157)", "44:ヒモ(P157)", "45:ホスト(P157)", "46:ホテルマン(P157)", "55:無職(P158)", "56:用心棒(P158)", "66:料理人(P158)"]}), "DT": $hash2(["name", "type", "table"], {"name": "ダメージ表", "type": "1D6", "table": ["疲れ", "痛み", "焦り", "不調", "ショック", "ケガ"]}), "FT": $hash2(["name", "type", "table"], {"name": "失敗表", "type": "1D6", "table": ["任意のアイテムを一つ失う", "１ダメージを受ける", "【所持金ランク】が１減少する（最低０）", "２ダメージを受ける", "【所持金ランク】が２減少する（最低０）", "標的レベルが１増加する"]}), "GJT": $hash2(["name", "type", "table"], {"name": "大成功表", "type": "1D6", "table": ["主人からお褒めの言葉をいただく", "ダメージを１回復する", "ダメージを１回復する", "関係のチェックを一つ消す", "ダメージを２回復する", "【所持金ランク】が１増加する"]}), "ITT": $hash2(["name", "type", "table"], {"name": "移動トラブル表", "type": "1D6", "table": ["検問（P220)", "急な腹痛（P220)", "黒煙（P221)", "蚊（P221)", "落とし物（P222)", "空腹（P222)"]}), "NTT": $hash2(["name", "type", "table"], {"name": "任務トラブル表", "type": "1D6", "table": ["通報（P223)", "プレッシャー（P223)", "マナー違反（P224)", "志願者（P224)", "仲間割れ（P225)", "狩人の噂（P225)"]}), "STT": $hash2(["name", "type", "table"], {"name": "襲撃トラブル表", "type": "1D6", "table": ["孤独な追跡者（P226)", "地元の若者たち（P226)", "V-FILES（P227)", "チンピラの群れ（P227)", "孤独な狩人（P228)", "狩人の群れ（P228)"]}), "HTT": $hash2(["name", "type", "table"], {"name": "変身トラブル表", "type": "D66N", "table": ["11:あれを食べたい(P214)", "12:あれを着たい(P214)", "13:あれを見たい(P215)", "14:あれを狩りたい(P215)", "15:あれを踊りたい(P216)", "16:あれに入りたい(P216)", "21:強奪(P217)", "22:暴行(P217)", "23:虐殺(P218)", "24:誘拐(P218)", "25:無精(P219)", "26:失踪(P219)", "31:あれを食べたい(P214)", "32:あれを着たい(P214)", "33:あれを見たい(P215)", "34:あれを狩りたい(P215)", "35:あれを踊りたい(P216)", "36:あれに入りたい(P216)", "41:強奪(P217)", "42:暴行(P217)", "43:虐殺(P218)", "44:誘拐(P218)", "45:無精(P219)", "46:失踪(P219)", "51:あれを食べたい(P214)", "52:あれを着たい(P214)", "53:あれを見たい(P215)", "54:あれを狩りたい(P215)", "55:あれを踊りたい(P216)", "56:あれに入りたい(P216)", "61:強奪(P217)", "62:暴行(P217)", "63:虐殺(P218)", "64:誘拐(P218)", "65:無精(P219)", "66:失踪(P219)"]}), "DET": $hash2(["name", "type", "table"], {"name": "ドライブイベント表", "type": "1D6", "table": ["身の上話をする。目標が背景分野で選択している特技がドライブ判定の指定特技になる。", "スキル自慢をする。目標が仕事分野で選択している特技がドライブ判定の指定特技になる。", "むかし行った場所の話をする。目標が捜索分野で選択している特技がドライブ判定の指定特技になる。", "趣味の話をする。目標が趣味分野で選択している特技がドライブ判定の指定特技になる。", "テーマがない雑談をする。目標が雰囲気分野で選択している特技がドライブ判定の指定特技になる。", "物騒な話をする。目標が戦闘法分野で選択している特技がドライブ判定の指定特技になる。"]}), "BET": $hash2(["name", "type", "table"], {"name": "ブレイクイベント表", "type": "1D6", "table": ["イケメンの車は風光明美な場所に到着する。197ページの「観光地」を参照。", "イケメンの車は明るい光に照らされた小さな店に到着する。197ページの「コンビニ」を参照。", "イケメンの車は巨大かつ何でも売っている店に到着する。198ページの「ホームセンター」を参照。", "イケメンの車はドライバーたちの憩いの地に到着する。198ページの「サービスエリア」を参照。", "イケメンの車は大きなサービスエリアのような場所に到着する。199ページの「道の駅」を参照。", "イケメンの車は闇の底に隠された秘密の場所に到着する。199ページの「友愛会支部」を参照。"]}), "CT": $hash2(["name", "type", "table"], {"name": "キャンプ表", "type": "1D6", "table": ["無料仮眠所・いい感じの空き地：定員無制限／居住性-2／価格0／発見率2", "カプセルホテル：定員1／居住性-1／価格3／発見率2", "ラブホテル：定員2／居住性0／価格4／発見率1", "ビジネスホテル：定員2／居住性0／価格4／発見率1", "観光ホテル：定員4／居住性1／価格5／発見率1", "高級ホテル：定員4／居住性2／価格6／発見率0"]}), "KZT": $hash2(["name", "type", "table"], {"name": "関係属性表", "type": "1D6", "table": ["軽蔑", "反感", "混乱", "興味", "共感", "憧れ"]})}));

    return self.$setPrefixes($rb_plus(["RTT"], (($a = Opal.cvars['@@tables']) == null ? nil : $a).$keys()));
  })($scope.base, $scope.get('DiceBot'))
})(Opal);

/* Generated by Opal 0.10.5 */
(function(Opal) {
  var self = Opal.top, $scope = Opal, nil = Opal.nil, $breaker = Opal.breaker, $slice = Opal.slice;

  Opal.add_stubs(['$exit']);
  return $scope.get('Kernel').$exit()
})(Opal);
