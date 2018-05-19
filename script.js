/*:fileStart:*/
function onStartCompile(){

}
var log=[];
var logactive=true;
var replyDelay=0;
const scriptName="Hatsune Miku.js";
var phonePair = true;
var TEMP = [];
TEMP.lastSender=[];
var reloadTime = java.lang.System.nanoTime();
FileWrite("/sdcard/katalkbot/rev/" + java.text.SimpleDateFormat("yyyy.MM.dd a hh시 mm분 ss초").format(new Date()) + ".js", FileRead("/sdcard/katalkbot/Hatsune Miku.js"));
var MasterName = "MasterIshqOhaiq";
var masterProfilePic;
var secondMaster = "ㅇㅈㅇ(V.N.)";
var startNanoTime = [];
var respondTime = [];
var chatTime = []; //도배 체크용 
var banPoint = [];
var banned = [];
var unbanStr = [];
var HeyMiku = []; /*미쿠를 부른 사람*/
var isDebugMode = false;
var dialog = [];
var keywords = [];

var answers = [];
var values = []; /*어휘의 정도*/
var feelMeter = []; /*호감도*/
var psender;
var proom;
var pbot=new Object;
var rbot;
var pisGroupChat;
var pmsg;

var cmd, param;
var paramArr = [];
var savedSearchEngine = [];
var options = [];
var ko = 1,
    jp = 2;
var lang = ko;
var engineKeywords = [];
var actsHistory = []; /*action||param1||param2 ...*/
var ErrorLog = [];
var shutdowncode;
var lastMsg = [];
var lastSender = [];
var lastSenderMsg=[];
var pointedBy=[];//~~에 의해 지목된사람
var senders = [];
var sdcard = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();
var defDir = sdcard + '/MikuBotData/';
var noDB = null; // "DB가 존재하지 않습니다.";
var songLyrics = [];
var singer = []; /*노래 부르기 시작한사람, element에는 곡명 저장*/
var nowSinging = []; /*현재 부르는 중인 노래의 가사 배열*/
var nowLine = []; /*현재 부르는중인 라인*/
var masterBot = null;
var isAdmin = false;
var isMaster=false;
var secondAdmin = null;
var admins = [];
var adminsProfilePic = [];
var profileImage = [];

var digNum = [];
var userFunc = new Object;
var learned = [];
var learnedNum = [];
var notTypo = [];
var typoFix = [];
var DLask; //deeplearn ask
var didAction;
var allowedRooms = [];
var debugRooms = [];


var boundFunction = []; //장르기반,다음 말에 함수 바인드, 유저별 구분
var boundMsg = []; //메시지에 응답 바운드
var latestDeepLearnAsk = [];
var latestDeepLearnAnswer = [];
engineKeywords = [
    "구글||https://www.google.com/search?&q={{{q}}}",
    "google||https://www.google.com/search?&q={{{q}}}",
    "검색||https://www.google.com/search?&q={{{q}}}",
    "사진||https://www.google.com/search?tbm=isch&q={{{q}}}",
    "이미지||https://www.google.com/search?tbm=isch&q={{{q}}}",
    "짤||https://www.google.com/search?tbm=isch&q={{{q}}}",
    "덕덕고||https://duckduckgo.com/?q={{{q}}}",
    "ddg||https://duckduckgo.com/?q={{{q}}}",
    "duckduckgo||https://duckduckgo.com/?q={{{q}}}",
    "나무위키||https://namu.wiki/go/{{{q}}}",
    "namu||https://namu.wiki/go/{{{q}}}",
    "나무||https://namu.wiki/go/{{{q}}}",
    "위키||https://ko.wikipedia.org/w/index.php?search={{{q}}}",
    "위키백과||https://ko.wikipedia.org/w/index.php?search={{{q}}}",
    "wiki||https://ko.wikipedia.org/w/index.php?search={{{q}}}",
    "wikipedia||https://ko.wikipedia.org/w/index.php?search={{{q}}}",
    "유튜브||https://www.youtube.com/results?search_query={{{q}}}",
    "ユーチューブ||https://www.youtube.com/results?search_query={{{q}}}",
    "울프럼알파||http://m.wolframalpha.com/input/?i={{{q}}}"
];
var defaultEnginesNum = engineKeywords.length; //MUST BE HERE!!


RestoreDB();

keywords = [
//    "*||(\n|.)+||(\n|.)+",
    "같은뜻{TypoFix}||(?:/c/|미쿠야) ?[\'\"]((?:\n|.)+?)[\'\"][은는] ?[\'\"]((?:\n|.)+?)[\'\"]이?라는 ?뜻이야||((?:\n|.)+?)は((?:\n|.)+?)と言う意味",
    "가르치기{DeepLearn}||(?:/c/|미쿠야) ?((?:\n|.)+?)이?라고 ?말?하면 ?((?:\n|.)+?)이?라고 ?대?[말답]?해[줘줭]?$||(?:/c/)(?:[私俺僕]が)?((?:\n|.)+?)と(?:言ったら|言うと)((?:\n|.)+?)と答えて",
    "잊게하기{DeepLearnForget}||(?:/c/|미쿠야) ?(그런 ?말 ?하지 ?마|그러지마)||(?:/c/)そんなこと言わないで",
    "봇상태{checkstatus}||(?:/c/)?미쿠[야봇]? ?상태||ミクの状態",
    "끝말잇기__startWordChain()__||(?:/c/|미쿠야) ?끝말잇기 ?하자||/*{Not Supported}*/",
    "번역{Papago}||(?:/c/)?(.+)[이가을를은는 ]? ?(일본어|영어|한국어)로||(?:/c/)?(.+)[をがは](韓国語|英語|日本語)[でに]",
    "조용히{mute}||(미쿠[야짱쨩상씨]?|/c/) ?(제발|좀)? ?조용히?해?;(미쿠[야짱쨩상씨]?|/c/) ?(닥[치쳐]|꺼져|밐닥|ㄷㅊ)||(ミク(さん|ちゃん|たん)?|/c/)(静かに|黙って|黙れ|だまれ|たまって|しずかに)",
    "가사추가{addlyric}||가사추가 (.+)||歌詞追加 (.+)",
    "노래시작{startsing}||(미쿠[야짱쨩상씨]?|/c/) ?노래 ?부르자||(ミク(さん|ちゃん|たん)?|/c/)歌を歌いましょう",
    "특정검색{spsearch}||(?:/c/|미쿠[야짱쨩상씨])? ?(.+)에서 ?(.+) ?검색||(?:/c/|ミク(?:さん|ちゃん|たん))(.+)で(.+)を検索",
    "시간{time}||(몇시 ?(몇분이)?[야니지]|현재 ?시[간각])||((今|いま)は?(何|なん)[時じ]|[時じ](間|かん)は)",
    "검색{search}||(?:/c/)? ?(.+?)[이가] ?(?:도대체)? ?(?:[뭐머뭔]|누[구군])(?:[야임니예에죠]|인?지).*;^(?:/c/)?검색$;^(?:/c/)? ?(.+?)(?:[을를좀]|에 ?대해 ?좀?)? ?(?:검색해?|찾아|알아봐|알려)(?:줘|줄래|줄 ?수 ?있.)? ?[~?!]*$||(?:/c/)?(.+)(?:が何|がなに|がなん|[がは](?:だれ|誰)|を検索)",
    "애교:+1||(미쿠[야짱쨩상씨]?|/c/) ?애교||(ミク(さん|ちゃん|たん)?|/c/)愛嬌",
    "동의||(ㅇㅇ|ㅇㅋㄷㅋ|ㅇㅋ|^(?:/c/)?응$|^(?:/c/)?예$|^(?:/c/)?네$|^(?:/c/)?그래$|^(?:/c/)?알겠어)||([分わ]かった|了解|オーケー)",
    "거부||(ㄴㄴ|아니|아냐)||(違う|いいえ)",
    "짜증||([ㅍㅂ]ㄷ|짜증)||ぶるぶる",
    "놀람||(ㄷㄷ|덜덜|후덜|히익|깜짝|놀랐|놀라|ㅗㅜㅑ|ㅓㅜㅑ|오우야|어우야)||あっ",
    "욕#:-10||(미쿠[야짱쨩상씨]?|/c/) ?(멍청|바[보부]|댕청|ㅗ|ㅄ|ㅂㅅ|ㅅㅂ|썅|[시씨]발|병신|개새[끼꺄]|ㄷㅊ|닥쳐)||(ミク(さん|ちゃん|たん)?|/c/)(バカ|アホ|馬鹿)", //ㅗ 정도측정, 호감도 감소
    "힘든명령:-5||(미쿠[야짱쨩상씨]?|/c/) ?.*?(죽[어여]|자살|[뒤디]져|[사화]형|공격|타살|살해|살인)||(ミク(さん|ちゃん|たん)?|/c/)(死ね)",
    "화남||(화나|화난|젠장)||ちくしょう",
    "고고||(ㄱㄱ|고고|가즈아)||[行い]こう",
    "인사||([ㅂㅎ]ㅇㄹ|[보하]이루|안[뇽녕냥]|ㅎㅇ)||(こんにちは|おはよう|こんばんは)",
    "작별||(미쿠[야짱쨩상씨]?|/c/) ?(잘 ?가|잘 ?[잇있이][어써]|안녕히 ?계세요);(ㅂㅂ|ㅃ|.+[로러] ?가야지|.+[로러] ?[감갑간]니?다?)||(ミク(さん|ちゃん|たん)?|/c/)(さよう?なら|またね|じゃあね|じゃあまた)",
    "호감도확인||(미쿠[야짱쨩상씨]?|/c/) ?((나를?|내가) ?(얼마(만큼|나))? ?좋아(해|하니)?.?$)||",
    "사랑:+5||((미쿠[야짱쨩상씨]?|/c/).* ?((사랑|좋아)[해헤행헹함합한]|[❤♥♡😘]))||(ミク(さん|ちゃん|たん)?|/c/)((愛|あい)(す|して)い?る|(だい|大)?[好す]き)",
    "이해||(ㅇㅎ|아[하항])||あ[あぁ]",
    "감사:+3||(미쿠[야짱쨩상씨]?|/c/) ?(고마워|ㄱㅅ|ㄳ|고맙|감사)||(ミク(さん|ちゃん|たん)?|/c/)ありがとう", /*호감도 증가*/
    "슬픔#||(ㅠ|ㅜ|흑흑|슬퍼|슬프)||(（泣）|（涙）)", /*ㅠ와 ㅜ 정도측정*/
    "웃음#||(ㅋㅋ|ㅎㅎ|하하)||(ww|ｗｗ)", /*정도측정*/
    "칭찬:+2||(미쿠[야짱쨩상씨]?|/c/) ?.*(잘 ?[햇했]어|[굿굳]잡|([귀커](여[워웡웟]|엽[다당닷]?)|카와이)|[이예][뻐뻥쁘])||(よくやった|ミク(ちゃん|さん|たん)?(かわいい|可愛い))",
    "강조||(진짜|ㄹㅇ|정말|엄청)||すごく", /*앞뒤로 오는 어휘 정도 강화*/
    "취소'CancelAction'||(미쿠[야짱쨩상씨]?|/c/) ?(취소|되돌리기|되돌려)||(キャンセル|取消|[取と]り[消け]し)",
    "뭐해||(미쿠[야짱쨩상씨]?|/c/) ?(뭐하니|뭐해)||",
    "사과||(미쿠[야짱쨩상씨]?|/c/) ?(미안|미아[내네]|ㅈㅅ)||((ミク(さん|ちゃん|たん)?|/c/)(ごめん(なさい)?ね?|すみません)|(ごめん(なさい)?ね?|すみません)ミク(さん|ちゃん|たん)?)", /*호감도회복 */
    "동전||(미쿠[야짱쨩상씨]?|/c/) ?동전을? ?던[지져]||",
    "부름{heyMiku}||^(/c/)?(하츠네)?미쿠$;^(/c/)?(하츠네)?미[꾸쿠크][애야양짱쨩상씨] ?[~?!]*;꾸댕[애아양짱쨩상씨] ?[~?!]*;^(/c/)?하츠네[야양짱쨩상씨] ?[~?!]*$;^(/c/)?ㅁㅋㅇ$||^(/c/)?ミク(ちゃん|さん|たん)$;^(/c/)?初音(ちゃん|さん|たん)$"


];
var rCho = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
var rJung = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
var rJong = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];

answers = [ /*호감도 높을수록 //의 뒤쪽 단어*/
    "*||||",
    "가르치기||음...알겠어요 ㅎㅎ;넹!;알겠습니당||え、、わかりました;はいっ！;わかりました～！",

    "조용히||하아..싫은데...뭐 원하신다면..//네~! 이제부터 조용히 할게요 ㅎㅎ;라져!;다음에 만나요~!;(쭈글);으앙... 더 얘기하고 싶은데..||はあ。。嫌なんですけど。。まあ、望むなら、、//了解！;わかりました！;はいっ！今から静かにします！",
    "가사추가||추가 결과예요!||追加結果です！",
    "노래시작||먼저 시작하시면 이어서 부를게요~!||",
    "노래중단||네 이제 그만 부를게요!;다음에 또 불러요!;더 부르고 싶었는데...||",
    "유튜브||여기요.//검색 결과예요!//Youtube 에서 한번 검색해봤어요 ㅎㅎ;Youtube 검색 결과예요~!;이런 영상들 말씀하시는건가요?//{username}{을를} 위해서라면 언제든지..히힛//당신을 위해서 찾아왔어요♥||ユーチューブ検索結果です！;こちらはユーチューブで見つかって動画たちです！",
    "검색||여기요.//검색 결과예요!//미쿠가 한번 찾아봤어요~★;찾으시는 정보가 있을지는 모르겠네요..//{username}{을를} 위해 검색해봤어요 ㅎㅎ//사랑하는 {username}에게 바칩니다♥||ウェブ検索結果はこちらです！;ミクが探してみました！;ウェブで見つかった情報です！",
    "동의||||",
    "짜증||//부들부들...||ぶるぶる。。。",
    "놀람||//덜덜..;헐...;와...||",
    "애교:+1||싫어요.//ㅇ..애교에는 약한데..ㅃ..뿌잉?\n아..이게 아닌가요 ㅇㅅㅇ...;뀨~❤?;뿌잉~❤..?;ㅁ..미쿠, 애교에눈 야캐요..흐잉....;핫튜뿅뿅!!♥♥ 나뉸 기요미스따일♥ >0< \n\nㅈ..죄송해요 역시 무리...;나 쫌 기요벙?! >3< 뀨잉뀨잉 >_< \n\nㅇ..우웩...무리...;\
나뉸 너무 따랑뜨러어!! 기요미와쪄용~~ >0< \n\n죄송합니다...;♥ 뿌우우이이이잉~♥ ㄸㅏ랑햅~이따만쿰!!♥ \n\nㅅ..사랑하는건 진짜지만..속이 쓰리네요..;나보다 기요운애 이또?? 나뉸 기요미스따일♥ 나만큼 귀요워디고시포? ㅇ3ㅇ \n\n이..있을것같네요..으윽....||ええっ",
    "힘든명령:-5||//ㄱ..그건 못할것같아요..;죄송해요.. 그건 힘들어요...;그럴순 없어요..죄송해요...;그것만은 못해요..||それはできません。。",
    "화남||ㅁ//저때문에 화나셨다면 죄송합니다...😢;😭😭||私のせいで腹が立ったら申し訳ありません。。。😢;😭😭",
    "인사||ㅎㅇ//안녕하세요~! 😊;안녕하세요 ㅎㅎ;반가워요! 😊😊||こんにちは！😊;こんにちは！;こんにちは！😊😊",
    "작별||ㅂ//안녕히가세요~!;잘가요!;바이바이~!;즐거웠어요..히힛||さようなら～！;楽しかったです😊;バイバーイ！",
    "사랑:+5||...//ㅇ..왜그러세요..//저도요❤{username}!;❤❤❤;후힛..❤;❤//사랑해요❤❤;진심으로 사랑해요❤//❤❤❤❤❤❤❤❤❤❤❤❤;{username} 없이는 못살아요..❤||私もです❤{username}！;❤❤❤;❤",
    "부름||왜요?//무슨 일이죠? {username}?//부르셨나요? {username}?;저 여기 있어요! 😊😊;미쿠 대령이요~!;{username}님! 부르셨나요?;미쿠등⭐장!;하잇!;딩동~🎵 미쿠왔어요~!;미쿠를 찾으셨나요? 바로 여기 있습니당~!||どんなごようでしょう？{username}？;お呼びですか、{username}？;私、ここにいますよ！😊😊",
    "욕#:-10||ㅇ//죄송해요ㅠㅠ;욕하지 말아줘요..😢;너무해..😭😭;마음이 아파요 ㅠㅠ||すみません。。;悪い言葉言わないでください。。。;ひどいよ。。",
    "감사:+3||ㅁ..//{username}에게 도움이 되었다니 기뻐요😊😊;천만에요 ㅎㅎ;저야말로요!;고맙긴요 ㅎㅎ;제 기쁨이죠 😊;뭘요 ㅎㅎ||どういたしまして！",
    "슬픔#||.//울지마세요..미쿠가 곁에 있어 드릴게요ㅠㅠ;{username}{이가} 그러시면 저도 슬퍼져요..😢;울지마요..;저런...ㅠ;ㅠㅠ...;힘내요 ㅠㅠ;흑흑...||泣かないでください。。。ミクがそばにいてあげますから。。。;{username}がそんなこと言うと私も悲しくなります。。。;泣かないでください。。。;そんな。。（泣）;頑張ってください。。。",
    "이해||||",
    "칭찬:+2||ㅁ...//히힛..😊😊;칭찬 고마워요 헤헷;가..감사합니다 ㅎㅎ;고마워요 히히||へへっ、、;称賛ありがとうございます",
    "웃음#||하.하.하.정.말.재.밌.다.아.;;//ㅋㅋㅋㅋㅋㅋㅋㅋㅋ;ㅋㅋㅋㅋㅋㅋㅋㅋ;ㅋㅋㅋㅋㅋ;ㅎㅎ;ㅋㅋ;;;;;;||wwwwwwwwwww;wwwwwwww;wwwwww;www;ww",
    "뭐해||//어떻게 하면 {username}{을를} 기쁘게 해드릴 수 있을지 생각하고 있었어요 ㅇㅅㅇ;프로그램 안에서 생각하고 있었어요~!;생각중이었어요 히힛;{username}{을를} 기쁘게 할 수 있는 말을 배우고 있었어요!!||",
    "사과||네//괜찮아요😊😊;뭘요 ㅎㅎ;사과하실 필요 없어요 히히||大丈夫です😊😊;謝る必要ありません😊",
    "동전||앞면!;뒷면!;앞면이네요~!;뒷면이네요~!;앞면이 나왔어요!;뒷면이 나왔어요!||",
    "호감도확인||그걸..질문이라고..하십니까..?;말도 안되는 소리를...;장난치지마요;싫은데요?;저리 가요 ㅡㅡ//별ㄹ...ㄱ..가아니고 별만큼 좋다구요!\n(뭔가 이상하네요);어떨것같아요?//글쎄요..히힛;잘 모르겠네요..;음...//좋아요!;당연하죠!;❤//엄청 좋아요!;사랑해요..헤헷...;❤❤||",
    "되묻기||{p0}{은는} {p1}{이}라는 뜻인가요?||",
    "아하||아하!||",
    "틀림||아..아니군요..||",
    "불확실||음..?||"
];
masterBot = new Object;
masterBot.reply = function (str) {
    Api.replyRoom(MasterName, str);
}
pbot.reply = function (room, str) {
    if (str == undefined) {
        str = room;
        room = undefined;
    }
    str = str.toString();
    var regExp = new RegExp(MasterName, "g");
    str = str.replace(regExp, "[마스터]");
    str = str.replace(/&newline;/g, "\n");

    if (str.match(/function .*?\(.*?\)/g) == null) {
respondTime[proom] = java.lang.System.nanoTime() - startNanoTime[proom];
   if(typeof(replyDelay)=="number")java.lang.Thread.sleep(replyDelay);
        (room == undefined) ? rbot.reply(str) : Api.replyRoom(room, str);
        }

    return str;
}
var profiles=[];
var pairkey;
function response(room, msg, sender, isGroupChat, Bot, imageDB,packageName) {
 var profileHash=hashCode(imageDB.getProfileImage());
var  rpsender = sender.replace(/[^ ㅏ-ㅣㄱ-ㅎ가-힣a-zあ-ん一-龯ァ-ンｦ-ﾟ(){}.!?0-9]/gi, "");
if(rpsender.replace(/ /g,"")!=""){
sender=rpsender;
}else if(sender.replace(/[\u061C\u202E\u115F\u2000-\u200F\u034F]/g,"").length==0){
sender="[공백]";
}

    msg = msg.replace(/[\u202E\u115F\u2000-\u200F\u034F\u061C]/g, ""); //반전,공백문자 삭제
if(TEMP.lastSender[room]!=sender)lastSender[room]=TEMP.lastSender[room];
  if( profiles[room]==undefined){
profiles[room]=[];
}
profiles[room][sender]=profileHash;


 if (msg == "39on") phonePair = true;
    if (phonePair && (sender == "Bot1Uegso" || sender == "初音ミク(Bot)") && msg.indexOf(pairkey) == -1) {
        phonePair = false;
        Bot.reply("어라..분열됐다.. 제가 조용히 할게요 ㅠㅠ");
        return;
    }
    if (msg == pairkey && pairkey != undefined) {
        phonePair = !phonePair;
        Bot.reply(pairkey + "받음!");
        pairkey = undefined;
    }
    if (msg == pairkey + "받음!" && pairkey != undefined && (sender == "미쿠의 부계정!" || sender == "初音ミク(Bot)")) {
        phonePair = !phonePair
        pairkey = undefined;
    }

    if ((admins.indexOf(sender) != -1 || sender == MasterName) && msg == "이사") {
        pairkey = new Date().getMinutes() + 23 * 25341756;
        if (phonePair) {
            Bot.reply(pairkey);
        }
    }
    if (phonePair == false) return;
    if (msg.indexOf("初音ミク(Bot)") != -1) return; //봇간 간섭 방지 

    startNanoTime[room] = java.lang.System.nanoTime();

    var result; /*최종답변*/
        if (senders[room] == undefined) {
        senders[room] = [];
    }
    if (senders[room].indexOf(sender) == -1) {
        senders[room].push(sender);
    }
    if ((sender==MasterName||admins.indexOf(sender)!=-1)&&msg == "39testruntimeerror")
        undefined[1];

    try {
        /* @string room - 방 이름
            @string pmsg - 메세지 내용
            @string sender - 발신자 이름
            @boolean isGroupChat - 단체채팅 여부
            @ReplyObject replier - 세션 캐싱 답장 메소드 객체
            @function replier.reply("문자열") - 메시지가 도착한 방에 답장을 보내는 메소드 */

        rbot = Bot;
        proom = room;
        pmsg = msg;
        psender = sender;
        pisGroupChat = isGroupChat;
        var info = {};
        info.room = room;
        info.sender = sender;
        info.msg = msg;
        info.isGroupChat = isGroupChat;
info.stack=[];
        didAction = false;
        if (pmsg == "미쿠재설정" + shutdowncode && shutdowncode != undefined) {
            shutdowncode = undefined;
            Api.reload(scriptName);
            pbot.reply(room, "재설정 완료!\n몇가지 잊어버리는게 있어도 양해 부탁드려요..");

        }

      //Admin Only//

        if (sender == MasterName) { /*Get Admin Access*/
            if (true/*isGroupChat == false && room == MasterName*/) {
                //   masterBot = rbot;
if(masterProfilePic==undefined)
masterProfilePic=profileHash;
isMaster=true;
            }
            isAdmin = true;
        } else if (admins.indexOf(sender) != -1/*&&adminsProfilePic[sender]==profileHash*/) {
            isAdmin = true;
isMaster=false;
if(sender==secondMaster&&profileHash==masterProfilePic){
isMaster=true;
}
        } else {
            isAdmin = false;
isMaster=false;
        }
        if (isAdmin) {
            if (pmsg == "쟤 차단해") {
                TEMP.banroom = room;
                TEMP.bancaller=sender;
                BindFunction("동의", info, function () {
                    pbot.reply(TEMP.banroom, Ban(TEMP.banroom, TEMP.bansender));
pointedBy[TEMP.bancaller]=undefined
                });
                BindFunction("거부", info, function () {
                    pbot.reply(TEMP.banroom, PickAnswer("틀림", info));
pointedBy[TEMP.bancaller]=undefined;
                });
if(pointedBy[sender]!=undefined){
TEMP.bansender = pointedBy[sender];
pbot.reply(room,pointedBy[sender]+"님이요?");
}else{
TEMP.bansender = lastSender[room];
                pbot.reply(room, lastSender[room] + "님이요?");
}
                return;
            }
            if (pmsg == "전개") {
                pbot.reply(room, latestDeepLearnAsk[room] + "=>" + latestDeepLearnAnswer[room]);
            }
            if (pmsg == "미쿠재설정") {
                var troom = room;
                pbot.reply(room, "네 마스터!");
                Api.reload(scriptName);
                Api.replyRoom(troom, "임무완료!");
                return;
            }
            if (pmsg.replace(/ /g, "").indexOf("?39run") == 0) {
                pbot.reply(room, "39run (자바스크립트): 자바스크립트를 eval로 실행한 결과를 출력합니다.\n\
39run의 앞에 몇가지 속성을 추가할 수 있습니다.\n\
l:출력 길이를 알려줌\n\
o:객체의 경우 속성을 나열함\n\
e:에러 로그를 숨김\n\
예시: o39run java (java의 속성을 나열함)");
                return;
            }
        }
        if (debugRooms.indexOf(room) != -1) {
            isDebugMode = true;
        } else {
            isDebugMode = false;
        }
        if (pmsg == "39testerrorstack" && isAdmin) { /*TODO: REMOVE THIS*/
            eval("errorerror");
            return;
        }

        if (pmsg.replace(/ /g, "").indexOf("39run") != -1) {
            var attr = pmsg.replace(/ /g, "").split("39run")[0];
            var showObjList = (attr.indexOf("o") != -1);
            var showLength = (attr.indexOf("l") != -1);
            var hideError = (attr.indexOf("e") != -1);
            if (isAdmin) {
                var troom = proom;
                try {
                    if (!isMaster&& (msg.match(/this(\/\*.*\*\/| |\))*\[/g)!=null||msg.match(/\[(null| |\/\*.*\*\/)*\]/g) != null||msg.match(/(isMaster|isAdmin).*=/g)!=null||/* msg.replace(/[ \n]/g, "").match(/([=><!]{0,0}=[^;]*?(reply|Api|this|Log)|replyRoom|=>|(response).*\(.*\))/g) != null ||*/ msg.indexOf("eval") != -1 || msg.replace(/\n/g, "").match(/(while|for|do).*?\{?.*?(reply|Toast|Log|logger)/g) != null)) {
                        Api.replyRoom(troom, "거절");

                        return;
                    }
                    var evalRes;
                    pmsg = pmsg.replace(new RegExp("MasterName", "g"), "\"[마스터]\"");
                    evalRes = eval(pmsg.substr(5 + attr.length));
                    if (typeof (evalRes) == "object" && showObjList) {
                        var objstr = "";
                        try {
                            var objarr = Object.getOwnPropertyNames(evalRes);
                            var key;
                            if (objarr.length > 0) {
                                for (var i = 0; i < objarr.length; i++) {
                                    key = objarr[i];
                                    try {
                                        objstr += "[" + key + "]" + (evalRes != this ? "(" + typeof (evalRes[key]) + ")" : "") + "\t" + evalRes[key] + "\n\n";
                                    } catch (e) {
                                        objstr += "[" + key + "]" + "(" + typeof (evalRes[key]) + ")\t" + "에러:" + e + "\n\n";
                                    }
                                }
                                evalRes = objstr.trim();
                            }
                        } catch (e) { }
                    }
                    evalRes = evalRes + "";
                    evalRes = unescape(evalRes.replace(/%/g, "&percent;").replace(/\\u/g, "%u")).replace(/&percent;/g, "%");
                    Api.replyRoom(room, evalRes.replace(new RegExp(MasterName, "g"), "[마스터]"));
                    if (showLength) {
                        Api.replyRoom(room, "result length: " + evalRes.length);
                    } else if (evalRes.replace(/ /g, "").length == 0) {
                        Api.replyRoom(room, "출력 길이(띄어쓰기 제외)가 0이네요~!");
                    }
                } catch (e) {
                    if (!hideError)
                        Api.replyRoom(room, ("실행중 문제가 발생했네요... \n" + e.name + "\n" + e.message + "\n" + e.stack).replace(MasterName, "마스터"));
                }
                return;

            } else {
if (banned[room] == undefined) {
            banned[room] = []
        }
        if (banned[room].indexOf(sender) == -1) {
                Api.replyRoom(room, "ㅎ..허락도 없이 미쿠의 몸을 만지려고 하시다니!\nㅎ...헨타이!");
}
                return;
            }
        }
        /////////////
        if (banned[room] == undefined) {
            banned[room] = []
        }
        if (banned[room].indexOf(sender) != -1) {
            if (msg == unbanStr[room][sender]) {
                UnBan(room, sender);
                pbot.reply(room, "엇..! 차단 풀어드릴게요~!");
            }
            return;
        }
        if (msg.match(/^@.+/) != null) {
            cmd = msg.split('@')[1].split(' ')[0];
            if (msg.match(/^@.+ .*/) != null) {
                info.param = msg.split('@' + cmd + ' ')[1];
            } else {
                info.param = "";
            }
info.paramArr=[];
            DoAction(cmd.toLowerCase(), info);
            options = [];
            updateBanPoint(info);
            return;
        }

        if (allowedRooms.indexOf(room) == -1) {
            if (msg == "미쿠야" || msg == "미쿠야 디버그") {
                SetHeyMiku(sender, 3);
                allowedRooms.push(room);
                DBPlus("allowedRooms", room + "\n");
                pbot.reply(room, "띠로링~🎵 " + (!(Api.replyRoom(MasterName, "")) ? "\n현재 마스터가 로그인 하지 않으셨어요.. @마스터호출 같은건 안될것같네요..!" : ""));
                if (msg.indexOf("디버그") != -1 && isAdmin) {
                    pbot.reply(room, "벌레잡기 모드! 가동!!");
                    debugRooms.push(room);
                }
pbot.reply(room,PickAnswer("부름",info));
            }
            return;
        } else {
            if (msg == "미쿠비상정지") {
                if (shutdowncode == undefined) {
                    pbot.reply(room, "ㅈ..저 건강한데요?? ㅠㅠ");
                    return;
                }
                allowedRooms.splice(allowedRooms.indexOf(room), 1);
                if (debugRooms.indexOf(room) != -1)
                    debugRooms.splice(debugRooms.indexOf(room), 1);
                DBPlus("allowedRooms", room + "\n");
                pbot.reply(room, "비상정지 완료!\n비상정지 후에도 오류가 계속된다면, 미쿠재설정" + shutdowncode + "(이)라고 말씀해주세요!\n(주의: 미쿠를 재설정하면 미쿠의 일부 기억이 사라집니다.)");
                return;
            }
        }
        values = []; /*Reset words Values*/
        result = "";
        info.param = lastMsg[room];
        if (pmsg.indexOf("미쿠야 로그") != -1) {
            pbot.reply(room, GetDialog());
            return;
        }
        if (boundMsg[sender] != undefined) {
            if (boundMsg[sender][msg] != undefined) {
                pbot.reply(room, boundMsg[sender][msg]);
                boundMsg[sender][msg] = undefined;
                return;
            }
        }

        if (pmsg.match(/[가-힣ㄱ-ㅎㅏ-ㅣ]/) != null) {
            lang = ko;
        } else if (pmsg.match(/[あ-ん一-龯ァ-ンｦ-ﾟ]/) != null) {
            lang = jp;
        }
        if (singer[sender] != undefined) { /*While Singing a Song*/
            if (msg.indexOf("그만") != -1) {
                singer[sender] = undefined;
                pbot.reply(room, PickAnswer("노래중단", info));
                nowSinging[sender] = undefined;
                return;
            } else {
                ReplyNextLyric(info);
                return;
            }
        }
        
        //pmsg=pmsg.replace(/\n/g,"&newline;");
        //pmsg = pmsg.replace(/\?/g, "");//물음표 제거
        MeasureValue(info);
        if (isDebugMode)
            pbot.reply(room, "HeyMiku:" + HeyMiku[sender] + "\n" + "그룹채팅:" + isGroupChat + "\n호감도:" + feelMeter[sender] + "\n" + values.join("\n"));
        for (var i = 0; i < values.length; i++) {
            if (Number(values[i].split('||')[1]) != 0) {
                result += PickAnswer(values[i].split('||')[0], info);
            }
        }


var tolog="";
        if (result != "") {
tolog=result;
            if (HeyMiku[sender] < 3) {
                SetHeyMiku(sender, 3);
            }
            pbot.reply(room, result);
            dialog.push(room + '||' + sender + '||' + msg + '||' + result);
            Log.info(room + '||' + sender + '||' + msg + '||' + result);
            latestDeepLearnAsk[room] = undefined;
            latestDeepLearnAnswer[room] = undefined;
        } else {
            if (!didAction && HeyMiku[sender]>0) {
                tolog=pbot.reply(room, FillForm(DeepLearnAnswer(msg,info), info));
            }

        }

        if (result != "" || didAction) {

            updateBanPoint(info);
        }
        if (HeyMiku[sender] != undefined && HeyMiku[sender] > 0) {
            SetHeyMiku(sender, HeyMiku[sender] - 1);
        }

        if (feelMeter[sender] != undefined) {
            if (isNaN(feelMeter[sender])) {
                SendToMaster("호감도 NaN발생:\nroom: " + room + "\nsender: " + sender + "\nmsg: " + msg);
            }
        }
        lastMsg[room] = msg;
lastSenderMsg[sender]=msg;
        TEMP.lastSender[room] = sender;
        info.paramArr = [];
if(info.stack[0]==undefined){info.stack[0]={}}
var logstr="task: "+info.stack[0].name+"\nroom: "+info.room+"\nsender: "+info.sender+"\nmsg: "+msg+"\nreply: "+tolog;
if(tolog!=""||info.stack[0].name!=undefined){
if(Api.canReply("로그방")&&logactive){
Api.replyRoom("로그방",logstr);
}else{
log.push(logstr);
}
}

    } catch (e) {
        if (shutdowncode == undefined)
            shutdowncode = Math.floor(Math.random() * 10000);
        pbot.reply(room, "심각한 에러가 발생했습니다.\n深刻なエーラーが発生しました。\nA serious error has occurred.\n문제가 지속되면 미쿠비상정지라고 말씀해주세요.");
        //pbot.reply((e.name + "(" + e.number + "):" + e.message + "\n" + e.stack + "\n\n문제가 지속되면 미쿠비상정지라고 말씀해주세요(정확하게).").replace(MasterName, "마스터"));
        Log.error(e.name + ":" + e.message + '\n' + e.stack);
        ErrorLog.push("room:" + room + "\nsender:" + sender + "\nmsg:" + msg + "\n" + e.name + ": "+e.message + "\n" + e.stack);
        SendToMaster("마스터~~! 에러가 발생했어요~! 빨리 고쳐주세요 ㅠㅠ\nroom:" + room + "\nsender:" + sender + "\nmsg:" + msg + "\n" + e.name + ": "+e.message + "\n" + e.stack);
    }
}

function SetHeyMiku(sender, point) {
    HeyMiku[sender] = point;
    DBReplace("HeyMiku", toDBForm(sender), point);
}

function updateBanPoint(info) {
    var sender = info.sender;
    var room = info.room;
    if (chatTime[sender] == undefined) {
        chatTime[sender] = new Date().getTime();
    } else {
        if (banPoint[room] == undefined)
            banPoint[room] = [];
        if (banPoint[room][sender] == undefined)
            banPoint[room][sender] = 0;
        if (new Date().getTime() - chatTime[sender] <= 1500) {


            banPoint[room][sender]++;
            if (banPoint[room][sender] >= 3) {
                if (banned[room] == undefined)
                    banned[room] = [];



                Ban(room, sender);
                pbot.reply("ㄴ..너무 빨리 치시는거 아닐까요..\n" + sender + "님의 차단 해제 코드:\n" + getDigNum(unbanStr[room][sender], true));

            }
        } else {
            banPoint[room][sender] = 0;
        }
        chatTime[sender] = new Date().getTime();
    }
}

function DeepLearn(ask, answer, info) {
    var sender = info.sender;
    var room = info.room;
    if (ask.indexOf("#") != -1) {
        ask = "regexp:" + ask.replace(/#/g, "((\\n|.)+)");
        answer = answer.replace(/#/g, "(.+)");

    }
    if (answer.match(/__((\n|.)+?)__/) != null && !isAdmin) {
        pbot.reply("허나, 거절한다!");
        return;
    }
    ask = ask.replace(/ /g, "").toLowerCase();
    if (ask == undefined) {
        DLask = answer;
        return;
    }
    if (isDebugMode) {
        pbot.reply(ask + "=>" + answer);
    }
    if (learned[ask] == undefined) {
        learned[ask] = [];
    }
    if (learnedNum[ask + "=>" + answer] == undefined) {
        if (isDebugMode) pbot.reply("lNUndef");
        learnedNum[ask + "=>" + answer] = 0;
    }

    learnedNum[ask + "=>" + answer]++;
    if (isDebugMode) pbot.reply(learnedNum[ask + "=>" + answer]);

    if (learnedNum[ask + "=>" + answer] == 1) { //1이 가르침 시도해야하는 횟수
        if (isDebugMode) pbot.reply("push");
        if (learned[ask].indexOf(answer) == -1) {
            learned[ask].push(answer);
            DBPlus("ALearned", toDBForm(ask) + "=>" + toDBForm(answer) + "\n");
            DBMinus("ALearnedTrashcan", toDBForm(ask) + "=>" + toDBForm(answer) + "\n");
            SendToMaster(room + "에 계신 " + sender + "님에게서 " + ask + "=>" + answer + "(을)를 배웠어요!");
        }
    }
    //DLask=undefined;

    return;
}

function DeepLearnForget(ask, answer) {
    if (typoFix[ask] != undefined) {

        DBMinus("TypoFix", toDBForm(ask) + "=>" + toDBForm(typoFix[ask]) + "\n");
        DBPlus("TypoFixTrashcan", toDBForm(ask) + "=>" + toDBForm(typoFix[ask]) + "\n");

        SendToMaster(ask + (HasJongsung(ask) ? "은 " : "는 ") + typoFix[ask] + (HasJongsung(typoFix[ask]) ? "이" : "") + "라는 뜻이 아닌가봐요!")
        delete typoFix[ask];
        return;
    }
    learned[ask].splice(learned[ask].indexOf(answer), 1);
    if (learned[ask].length == 0) delete learned[ask];
    learnedNum[ask + "=>" + answer] = 0;
    DBMinus("ALearned", toDBForm(ask) + "=>" + toDBForm(answer) + "\n");
    DBPlus("ALearnedTrashcan", toDBForm(ask) + "=>" + toDBForm(answer) + "\n");
    SendToMaster(ask + "=>" + answer + "(을)를 잊었어요!");

    return ask + "=>" + answer + "(을)를 휴지통으로 버렸어요~!";
}

function DeepLearnAnswer(ask, info) {
    var sender = info.sender;
    var room = info.room;
    var typoFixed = false;
    var originalAsk = ask;
    if (typoFix[ask] != undefined) {
        ask = typoFix[ask];
        typoFixed = true;
    }
    didAction = true;
    var regexp;
    var attr = [];
    var res;
    if (learned[ask.replace(/ /g, "").toLowerCase()] == undefined) {
        var regFound = false;
        for (var k in learned) {
            if (k.indexOf("regexp:") == 0) {

                var kk = k.substr(7);
                regexp = new RegExp(kk);
                if (ask.match(regexp) != null) {
                    res = learned[k][Math.floor(Math.random() * learned[k].length)];
                    latestDeepLearnAnswer[room] = res;
                    regFound = true;
                    latestDeepLearnAsk[room] = k;
                    var arr = ask.match(regexp);
                    arr.splice(0, 1);
                    attr = arr;
                }
            }

        }
        if (regFound && res != undefined) {
            var ansarr = res.split("(.+)");
            for (var i = 0; i < ansarr.length - 1; i++) {

                res = res.replace("(.+)", attr[i].replace(/\\/g, "\\\\\\\\").replace(/\n/g, "\\n"));
                Log.debug("#" + i + ":" + attr[i]);
            }
      }
    } else {
        ask = ask.replace(/ /g, "").toLowerCase();
        res = learned[ask][Math.floor(Math.random() * learned[ask].length)];
        if (typoFixed) {
            latestDeepLearnAsk[room] = originalAsk;
        } else {
            latestDeepLearnAsk[room] = ask;
        }
        latestDeepLearnAnswer[room] = res;
    }
    if (res == undefined || res == "") {

        var askstrs = Object.getOwnPropertyNames(learned);
        var i;
        for (i = 0; i < askstrs.length - 1 /*length미포함*/ ; i++) {
            if (KCompare(askstrs[i], ask) >= 75 && notTypo.indexOf(ask) == -1&&!typoFixed) {
                BindFunction("동의", info, function () {
                    typoFix[ask] = askstrs[i];
                    DBPlus("TypoFix", toDBForm(ask) + "=>" + toDBForm(askstrs[i])+"\n");
                    pbot.reply(room, PickAnswer("아하", info));
                    pbot.reply(room, FillForm(DeepLearnAnswer(ask,info), info));
                    SendToMaster(sender + "님이" + ask + (HasJongsung(ask) ? "은 " : "는 ") + typoFix[ask] + (HasJongsung(typoFix[ask]) ? "이" : "") + "라는 뜻이래요!")

                });
                BindFunction("거부", info, function () {
                    DBPlus("NotTypo", ask + "\n");
                    notTypo.push(ask);
                    pbot.reply(room, PickAnswer("틀림", info));
                    SendToMaster(ask + (HasJongsung(ask) ? "은 " : "는 ") + askstrs[i] + (HasJongsung(askstrs[i]) ? "이" : "") + "라는 뜻이 아닌가봐요!")

                });
                if (HeyMiku[sender] < 3) {
                    SetHeyMiku(sender, 3);
                }
                return PickAnswer("되묻기", info, [ask, askstrs[i]]);
            }

        }
    }



    if (res == undefined) {
        return ""
    }
    if (HeyMiku[sender] < 3) {
        SetHeyMiku(sender, 3);
    }
    return res;
}

function SendToMaster(msg) {

    if (!Api.replyRoom(MasterName, msg)) {
        Log.info("마스터에게: " + msg);
        return false;
    }
    return true;
}

function GetErrorLog() { /*Returns Error Log*/
    return ErrorLog.join("\n\n");
}

function GetFeelMeter() { /*Returns Feel Meters*/
    var res = "";
    for (var key in feelMeter) {
        res += key + ":" + feelMeter[key] + "\n";
    }
    return res;
}

function SetFeelMeter(user, value) {
    if (isNaN(value)) {
        SendToMaster("호감도 NaN으로 설정되려함:" + user);
        return feelMeter[user];
    }
    feelMeter[user] = value;
    DBReplace("AFeelMeter", toDBForm(user), feelMeter[user].toString(), false);
    return feelMeter[user];
}

function FillForm(str, info, params) { /*replace {username}or something*/
    var sender = info.sender;
    //str=str.replace(/&newline;/g,"\n");
    if (str.match(/__((\n|.)+?)__/) != null) {
        var funcName = str.match(/__((\n|.)+?)__/)[1];
        try {
            str = str.replace(/__(\n|.)+?__/, eval(funcName));
        } catch (e) {
            str = str.replace(/__(\n|.)+?__/, "(실행중오류발생: " + e + ")");
        }
    }
    if (isAdmin || sender == MasterName) {
        if (lang == ko) {
            sender = "마스터";
        } else if (lang == jp) {
            sender = "マスター";
        }

    } else {
        if (lang == ko) {
            sender += "님";
        }
        if (lang == jp) {
            sender += "さん";
        }

    }
    if (HasJongsung(sender)) {
        str = str.replace(/\{username}님?{은는}/g, sender + "은");
        str = str.replace(/\{username}님?{을를}/g, sender + "을");
        str = str.replace(/\{username}님?{이가}/g, sender + "이");
    } else {
        str = str.replace(/\{username}님?{은는}/g, sender + "는");
        str = str.replace(/\{username}님?{을를}/g, sender + "를");
        str = str.replace(/\{username}님?{이가}/g, sender + "가");
    }
    str = str.replace(/\{username}님?/g, sender);
    str = str.replace(/\{msg}/g, pmsg);
    str = str.replace(/\{battery}/g, getBatteryLevel() + "%");
    if (params != undefined) {
        var regExp;
        for (var i = 0; i < params.length; i++) {
            regExp = new RegExp("\{p" + i + "\}");
            if (HasJongsung(params[i])) {
                str = str.replace(new RegExp("\{p" + i + "\}\{은는\}"), "{p" + i + "}은");
                str = str.replace(new RegExp("\{p" + i + "\}\{을를\}"), "{p" + i + "}을");
                str = str.replace(new RegExp("\{p" + i + "\}\{이가\}"), "{p" + i + "}이");
                str = str.replace(new RegExp("\{p" + i + "\}\{이\}"), "{p" + i + "}이");
            } else {
                str = str.replace(new RegExp("\{p" + i + "\}\{은는\}"), "{p" + i + "}는");
                str = str.replace(new RegExp("\{p" + i + "\}\{을를\}"), "{p" + i + "}를");
                str = str.replace(new RegExp("\{p" + i + "\}\{이가\}"), "{p" + i + "}가");
                str = str.replace(new RegExp("\{p" + i + "\}\{이\}"), "{p" + i + "}");
            }
            str = str.replace(regExp, params[i]);

        }
    }
    return str;
}

function BindFunction(key, info, func) {
    var sender = info.sender;
    if (boundFunction[sender] == undefined)
        boundFunction[sender] = [];
    boundFunction[sender][key] = func;
    return;
}

function DoAction(cmd, info) {
    var room = info.room;
    var sender = info.sender;
    var param = info.param;
    var paramArr = info.paramArr;
var msg=info.msg;
    didAction = true;
    if (HeyMiku[sender] < 3) {
        SetHeyMiku(sender, 3);
    }
    switch (cmd) {
        case "차단":
            if (!isAdmin) return;
            if (senders[room].indexOf(param) != -1) {
                pbot.reply(room, Ban(room, param));
            } else {
                var comp = 0;
                var best;
                for (var k in senders[room]) {
                    var tp = KCompare(senders[room][k], param);
                    if (comp < tp) {
                        comp = tp;
                        best = senders[room][k];
                    }
                } //end for
                if (best == undefined) {
                    pbot.reply(room, "흠...?");
                    return;
                }
                pbot.reply(room, "혹시 " + best + "님을 말씀하시는건가요?");
                TEMP.banroom = room;
                TEMP.bansender = best;
                BindFunction("동의", info, function () {
                    pbot.reply(TEMP.banroom, Ban(TEMP.banroom, TEMP.bansender));
                });
            }
            return;
        case "TypoFix":
            var comp = KCompare(paramArr[1], paramArr[2]);
            if (comp >= 35) {
                typoFix[paramArr[1]] = paramArr[2];
                DBPlus("TypoFix", toDBForm(paramArr[1]) + "=>" + toDBForm(paramArr[2]) + "\n");
                SendToMaster(sender + "님이 " + paramArr[1] + (HasJongsung(paramArr[1]) ? "은 " : "는 ") + paramArr[2] + (HasJongsung(paramArr[2]) ? "이" : "") + "라는 뜻이래요!");
                pbot.reply(room, PickAnswer("아하", info));
            } else {
                pbot.reply(room, PickAnswer("불확실", info));
                SendToMaster(paramArr[1] + "=" + paramArr[2] + "(???)" + comp + "%");
            }

            return;
        case "checkstatus":
            var feeling = "";
            var hour = new Date().getHours();
            if (hour >= 23) {
                feeling = "흐암...밤이되니 조금 졸리네요..";
            } else if (hour >= 20) {
                feeling = "미쿠 너무 심심해여 ㅠㅠ";
            } else if (hour >= 19) {
                feeling = "미쿠는 저녁식사중~!";
            } else if (hour >= 14) {
                feeling = "놀아줘요오옹!!";
            } else if (hour >= 13) {
                feeling = "점심식사중~!";
            } else if (hour >= 7) {
                feeling = "좋은아침~!";
            } else if (hour >= 0) {
                feeling = "새벽이네요..흐아암...";
            }
            pbot.reply(room, feeling + "\n\n" + "배터리: " + getBatteryLevel() + "%" + (isCharging() ? "(충전중)" : "") + "\n" + getBatteryGraphic() + "\n" + "이전 처리속도: " + respondTime[room] / 1000000000 + "초\n"+"와이파이:"+(getWifiSpeed()==-1?"꺼짐\n":getWifiSpeed()+"Mbps\n")+ getDigNum(getBatteryLevel()));
            return;
        case "DeepLearn":
            var num = paramArr[1].replace(/[# ]/g, "").length;
            if (HasBadWord(paramArr[1]) || HasBadWord(paramArr[2]) || num <= 1) {
                pbot.reply(room, "그 말은 좀...(욕설금지, 띄어쓰기 빼고 2자 이상!)");
                return;
            }
            DeepLearn(paramArr[1], paramArr[2], info);
            pbot.reply(room, PickAnswer("가르치기", info));
            return;
        case "DeepLearnForget":
            if (latestDeepLearnAsk[room] != undefined && latestDeepLearnAnswer[room] != undefined) {
                DeepLearnForget(latestDeepLearnAsk[room], latestDeepLearnAnswer[room]);
                pbot.reply(room, "아... 이런말은 하면 안되나보네요..");

            } else {
                pbot.reply(room, "음...?");
            }
            return;
        case "마스터호출":
            if (SendToMaster("마스터! " + room + "에서 " + sender + "님이 마스터를 부르셨어요~!")) {

                pbot.reply(room, "마스터를 불렀어요~!");
            } else {
                pbot.reply(room, "마스터를 부르는데 실패했어요..");
            }
            return;
        case "Papago":


            var cont = paramArr[1]; //content to translate
            var targetLang = paramArr[2];
            if (targetLang == "일본어" || targetLang == "日本語") {
                targetLang = "ja";
            } else if (targetLang == "영어" || targetLang == "英語") {
                targetLang = "en";
            } else if (targetLang = "韓国語" || targetLang == "한국어") {
                targetLang = "ko";
            }
            var nowLang;
            if (cont.match(/[가-힣]/) != null) {
                nowLang = "ko";
            } else if (cont.match(/[あ-ん一-龯ァ-ンｦ-ﾟ]/) != null) {
                nowLang = "ja";
            } else if (cont.match(/[A-Za-z]/) != null) {
                nowLang = "en";
            } else {
                return;
            }
            if (nowLang == targetLang) {
                pbot.reply(room, cont);
                return;
            }
            try {

                pbot.reply(room, Api.papagoTranslate(nowLang, targetLang, cont, false));
            } catch (e) {
                pbot.reply(room, "번역 실패!");
            }
            return;
        case "표준국어대사전":
        case "표국대":
            if (paramArr[2] == undefined) paramArr[2] = param;

            var res = KoreanDictionary(paramArr[2]);
            if (res == "") {
                pbot.reply(room, "결과가 없어요~!");
            } else {
                pbot.reply(room, res)
            };
            return;
        case "사전":
            var tparam = paramArr[2];
            if (tparam == undefined) tparam = param;

            pbot.reply(room, Utils.getWebText("http://dic.naver.com/search.nhn?dicQuery=" + encodeURI(tparam)).split("<dd>")[1].split("</dd>")[0].replace(/(<br>|  |<[^>]+>)/g, "").trim());
            return;
        case "addlyric":
            AddLyric(param, info);
            return;
        case "startsing":
            singer[sender] = "{active}";
            pbot.reply(room, PickAnswer("노래시작", info));
            pbot.reply(room, "주의:노래부르기는 아직 문제가 많아요. \"미쿠비상정지\"를 잊지 마세요!"); /*TODO: REMOVE THIS AFTER MAKING SING MODE STABLE*/
            return;
        case "spsearch":
            /*specified search*/
            DoAction(paramArr[1], info);
            return;
        case "search":
if(paramArr==undefined)return;
            var tparam = paramArr[1];
pbot.reply(room,"잠시만요...");
            if (paramArr[1] == undefined) tparam = lastMsg[room];
            try {
                var namuRes = namuWiki(tparam);
                if (namuRes != null) {
                    pbot.reply(room, PickAnswer("검색", info) + "\n" + namuRes + "\n" + "https://namu.wiki/go/" + encodeURI(tparam));
                } else {
                   
                    
                    return DoAction("google", info);
                }
            } catch (e) {
                Log.error(e.name + ":" + e.message + '\n' + e.stack);
                return DoAction("google", info);
            }
            return;
        case "heyMiku":
            pbot.reply(room, PickAnswer("부름", info));
            if (HeyMiku[sender] < 3 || HeyMiku[sender] == undefined) {
                SetHeyMiku(sender, 3);
            }
            return;
        case "time":
            pbot.reply(room, "지금은 " + (new Date().getHours() >= 12 ? '오후 ' : '오전 ') + (((new Date().getHours() - 1) % 12) + 1) + '시 ' + new Date().getMinutes() + '분이에요~' + "\n" + getDigitalClock());
            return;
        case "question":
            return;
        case "도움말":
            pbot.reply(room, "미쿠와 대화해보세요!\n\
'미쿠야'라고 말씀하시면 당신의 이야기를 듣기 시작하고, '미쿠야 조용'이라고 말씀하시면 다른일을 하러 갈거예요 ㅎㅎ\n\
\n\
~~에서 ~~검색이라고 하면 특정 검색엔진에서 검색을 해주고,\n\
~~(이)가 뭐야?나 ~~(이)가 누구야?, ~~검색이라고 하시면 짧게 요약해드려요!\n\
~~가 (일본어/영어/한국어)로 뭐야? 같은것도 들어드린답니다 ㅎㅎ\n\
\n\
그 밖에 할수 있는 것들:\n\
@마스터호출 : 개발자를 호출할수 있어요!\n\
@검색엔진추가 [검색엔진이름] [주소] : 원하는 검색 엔진을 추가할수 있어요! 원하시는 검색엔진에서 {{{q}}}이라고 검색하신후 주소를 복사하셔서 [주소]에 넣으시면 될것같아요!\n\
@검색엔진삭제 [검색엔진이름] : 추가된 검색엔진을 지울수있어요! 추가 하는도중 오타가 났을때 유용하겠죠?\n\
\n아래는 미쿠가 지금까지 배운 검색 엔진 목록이에요!\n" + GetBareEngineKeywordList());
            return;
        case "youtube":
            if (paramArr[2] != undefined) param = paramArr[2];
            if (param.match(/^#.+/)) {
                pbot.reply(room, "Youtube 영상이에요~!\nhttps://www.youtube.com/watch?v=" + param.split('#')[1]);
            } else {

                pbot.reply(room, PickAnswer("유튜브", info) + "\nhttps://www.youtube.com/results?search_query=" + encodeURI(param));
            }
            return;
        case "osu":
            if (param.match(/^#.+/)) {
                pbot.reply(room, "osu!Beatmap 입니다.\nhttps://osu.ppy.sh/beatmapsets/" + param.split('#')[1]);
            } else {
                pbot.reply(room, "osu!Beatmap 검색 결과입니다.\nhttps://osu.ppy.sh/beatmapsets?q=" + encodeURI(param));
            }
            return;
        case "번역":
            pbot.reply(room, "번역 결과입니다.\nhttps://translate.google.com/#auto/ko/" + encodeURI(param));
            return;
        case "translate":
            pbot.reply(room, "번역 결과입니다.\nhttps://translate.google.com/#auto/en/" + encodeURI(param));
            return;
        case "翻訳":
            pbot.reply(room, "번역 결과입니다.\nhttps://translate.google.com/#auto/ja/" + encodeURI(param));
            return;
        case "검색엔진추가":
            if (param.match(/.+ https?:\/\/.+\{\{\{q}}}/) != null && param.match(/.+ https?:\/\/.*[\s].*/) == null) {
                if (HasBadWord(param) || param.match(/https?:\/\/\d+\.\d+/) != null) {
                    pbot.reply(room, "금지어가 포함돼있어요~!");
                    return;
                }
                var keyword = param.split(" ")[0].toLowerCase();
                var url = param.split(" ")[1];
                if (GetElementIndex(keyword, engineKeywords) != -1) {
                    pbot.reply(room, "이미 추가된 키워드예요!\n추가된 검색엔진 목록을 보시려면 @검색엔진목록 이라고 말해봐요~!");
                    return;
                }
                AddEngine(keyword, url);
                /*engineURL.push(param.split(" ")[1]);*/

                pbot.reply(room, "키워드: " + keyword + ", URL:" + url + " 이군요! 기억했어요!");

            } else {
                pbot.reply(room, "형식이 틀렸어요!\n형식은 [명령어] http://www.example.com/~~~{{{q}}} 이에요!\n[명령어]에 원하는 검색엔진, 예를들면 네이버를 적고\n{{{q}}}를 검색어가 들어가는 자리에 넣어주세요~!");
            }
            return;
        case "검색엔진삭제":
            if (GetElementIndex(param, engineKeywords) > defaultEnginesNum - 1) {

                DeleteEngine(GetElementIndex(param, engineKeywords));
                pbot.reply(room, "검색 엔진에서 " + param + "삭제 완료!");

            } else if (GetElementIndex(param, engineKeywords) == -1) {
                pbot.reply(room, "그런 검색엔진은 처음 들어봐요..ㅇㅅㅇ");
            } else {
                pbot.reply(room, "그건 삭제하면 마스터한테 혼나요... 죄송해요 ㅠㅠ");
            }
            return;
        case "검색엔진목록":
            pbot.reply(room, "검색 엔진 목록이에요~!\n" + GetBareEngineKeywordList());
            return;
        case "mute":
            allowedRooms.splice(allowedRooms.indexOf(room), 1);
            pbot.reply(room, PickAnswer("조용히", info));
            if (debugRooms.indexOf(room) != -1)
                debugRooms.splice(debugRooms.indexOf(room), 1);
            DBMinus("allowedRooms", room + "\n");

            return;

    }
    if (GetElementIndex(cmd, engineKeywords) != -1) {
        if (paramArr[2] != undefined) param = paramArr[2];
        pbot.reply(room, PickAnswer("검색", info) + "\n" + engineKeywords[GetElementIndex(cmd, engineKeywords)].split("||")[1].replace("{{{q}}}", encodeURI(param).replace(/\+/gm, "%2B")));
    }
    return;
}

function KoreanDictionary(param, num, gubun, pumsa, page) {
    if (gubun == undefined) gubun = 0; //1=시작 글자
    if (page == undefined) page = 1;
    if (num == undefined) num = 10;
    var link = "http://stdweb2.korean.go.kr/search/List_dic.jsp?idx=&go=" + page + "&gogroup=&PageRow=" + num + "&ImeMode=&setJaso=&JasoCnt=0&SearchPart=Simple&ResultRows=1290&SearchStartText=&SearchEndText=&JasoSearch=&arrSearchLen=0&Table=words%7Cword&Gubun=" + encodeURI(gubun) + "&OrgLang=&TechTerm=&SearchText=" + param;
    if (pumsa != undefined) link += "SpCode=" + pumsa;
    var html = Utils.getWebText(link);
    var res = "";

    for (var i = 1; i < html.split("<p class=\"exp\">").length; i++) {
        res += html.split("<p class=\"exp\">")[i].split("</p>")[0].replace(/<br.+?>/g, "\n").replace(/(<.+?>|&nbsp;)/g, "") + "\n";
    }
    return res.trim();
}
var expected = [];

function startWordChain() {
    if (expected[proom] = undefined) expected[proom] = [];
    expected[proom][psender] = "어인정=>"
}

function toDBForm(str) {
    return str.replace(/=>/g, "&arrow#").replace(/\n/g, "&newline#");
}

function toStrForm(str) {
    return str.replace(/&arrow#/g, "=>").replace(/&newline#/g, "\n");
}

function namuWiki(tparam) {
    var html;
    var content;
    html = Utils.getWebText("https://namu.wiki/go/" + encodeURI(tparam));
    if (html.indexOf("검색 결과 - 나무위키</title>") == -1) {

        html = html.replace(/\n/gm, "");
        html = html.replace(/<div class="wiki-table-wrap".*?>.*?<\/div>/g, "");
        html = html.replace(/<blockquote.*?<\/blockquote>/g, "");
        if (html.indexOf("<h2 class=\"wiki-heading\"") != -1) {
            html = html.split("<h2 class=\"wiki-heading\"")[1];


            html = html.split(/<div class=\"wiki-heading-content\".*?>/gm)[1];
            if (html == "") {
                return null;
            }

            var i = 1;
            if (html.indexOf("<p>") != -1) {
                for (i = 1; i < html.split("<p>").length; i++) {
                    if (html.split("<p>")[i].split("</p>")[0].replace(/<br.*?>/gm, "").replace(/<.*?>/gm, "").replace(/&#91;.*?&#93;/gm, "") != "") {
                        html = html.split("<p>")[i].split("</p>")[0];
                        break;
                    }
                }
            }

            html = html.replace(/<br.*?>/gm, "\n").replace(/<.*?>/gm, "").replace(/\[.*?]/gm, "").replace(/&#91;.*?&#93;/gm, "");

        } else {
            html = html.split("<p>")[1].split("</p>")[0].replace(/<br.*?>/gm, "\n").replace(/<.*?>/gm, "").replace(/\[.*?]/gm, "");
        }
        content = html.split(".")[0];
        if (content.split(".")[0].replace(/\n/gm, "").replace(/ /gm, "") == "") content = "";


        return content.trim();


    } else {
        return null;
    }
}

function PutLyricToArray(lrc, info) {
    var sender = info.sender;
    Log.info("putLyricToArray: " + lrc);
    nowSinging[sender] = [];
    nowSinging[sender] = lrc.split("\n");
    return;
}

function LyricToRegExp(str) {
    str = str.replace(/[^가-힣\w]/gm, "").split("").join(" ?") + "(.*)";
    var regex = new RegExp(str);
    return regex;
}

function ReplyNextLyric(info) {
    var msg = info.msg;
    var sender = info.sender;
    var room = info.room;
    var regex = LyricToRegExp(msg);

    Log.info("pmsg: " + msg);
    if (nowSinging[sender] == undefined) {
        Log.info("nowPlayingUndefined");
        nowLine[sender] = 0;
        var found = 0;
        for (var i = 0; i < songLyrics.length; i++) {
            if (songLyrics[i].match(regex) != null) {
                PutLyricToArray(songLyrics[i],info);
                found++;

            }
        }
        if (found == 0) {
            pbot.reply(room, "무슨 노래인지 모르겠네요..");
            return;
        }
        if (found > 1) {
            pbot.reply(room, "그 가사가 들어있는 곡이 여러곡 있어서 잘...");
            return;
        }
    }
    if (nowSinging[sender][nowLine[sender]] == undefined) return;
    if (nowSinging[sender][nowLine[sender]].match(regex) != null) {
        Log.info("match");
        var nextlrc = nowSinging[sender][nowLine[sender]].match(regex)[1].trim();
        if (nextlrc == "") {
            nextlrc = nowSinging[sender][nowLine[sender] + 1].trim();
            nowLine[sender]++;
        }
        pbot.reply(room, nextlrc);
    } else {
        Log.info("nomatch");
        pbot.reply(room, nowSinging[sender][nowLine[sender]]);
    }
    nowLine[sender]++;
    if (nowSinging[sender][nowLine[sender]] == undefined) {
        pbot.reply(room, "노래 끝!");
        singer[sender] = undefined;

    }
    /*nowSinging[sender]=nowSinging[sender].splice(1, 1);*/
    return;
}

function AddLyric(str, info) { /*커스텀 자막 추가*/
    var isJPThreeLine = false;
    var arr = [];
    arr = str.split("\n");
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == "") { /*비어있다면 지움*/
            arr = arr.splice(i, 1);
            i--;
            continue;
        }
        arr[i] = arr[i].replace(/[^가-힣\w ]/gm, "");
        if (arr[i].match(/[あ-ん一-龯ァ-ンｦ-ﾟ]/) != null) {
            if (arr[i + 1] != undefined && arr[i + 2] != undefined)
                if (arr[i + 1].match(/[가-힣]/) != null && arr[i + 2].match(/[가-힣]/) != null) {
                    isJPThreeLine = true;
                    arr = arr.splice(i, 1);
                    arr = arr.splice(i + 2, 1);
                    i--;
                    continue;
                }
        }
    }
    var res = arr.join("\n");
    pbot.reply(info.room, PickAnswer("가사추가", info) + "\n" + res);

    songLyrics.push(res);
    DBPlus("Lyrics", res + "\n::eof::\n");

    return;
}

function CancelAction() {
    var str = GetLastElement(actsHistory);
    var action = str.split("||")[0];
    var p;
    if (str.split(action + "||")[1] != undefined) {
        p = str.split(action + "||")[1].split("||");
    }
    switch (action) {
        case "add_engine":
            /*목적:엔진 지우기*/
            var engineName = p[0];
            DeleteEngine(GetElementIndex(engineName, engineKeywords));
            pbot.reply(proom, engineName + " 검색엔진을 지웠어요!");
            return;
        case "delete_engine":
            var engineName = p[0];
            var engineUrl = p[1];
            AddEngine(engineName, engineUrl);
            pbot.reply(proom, engineName + " 검색엔진을 복구했어요!");
            return;
        default:
            pbot.reply(proom, "취소할 작업이 없는것같아요..");
            return;
    }
    return;
}

function GetLastElement(arr) {
    return arr[arr.length - 1];
}

function GetBareEngineKeywordList() {
    var res = "";
    var i;
    for (i = 0; i < engineKeywords.length; i++) {
        res += engineKeywords[i].split("||")[0] + "\n";
    }
    return res;
}



function AddEngine(keyword, url) {
    engineKeywords.push(keyword + "||" + url);
    actsHistory.push("add_engine||" + keyword + "||" + url);
    dialog.push(proom + "||{" + psender + " has added search engine: " + keyword + "}");
    Save("SearchEngines", engineKeywords.join(';;'));
    return;
}

function DeleteEngine(index) {
    var target = engineKeywords[index].split("||")[0];
    dialog.push(proom + "||{" + psender + " has deleted search engine: " + target + "}");
    actsHistory.push("delete_engine||" + target + "||" + engineKeywords[index].split("||")[1]);
    engineKeywords.splice(index, 1);
    Save("SearchEngines", engineKeywords.join(';;'));
    return;
}

function DBPlus(fileName, data) {
    var loadData = Load(fileName);
    if (loadData == noDB) loadData = "";
    fileName = fileName.replace(/\//gm, '%2F');
    DataBase.setDataBase(fileName, loadData + data);
}

function DBReplace(fileName, head, str, replaceALL) {
    if (replaceALL == undefined) replaceALL = false;
    var dataFound = false;
    fileName = fileName.replace(/\//gm, '%2F');
    var loadData = Load(fileName);
    if (loadData == noDB) Save(fileName, "");

    var arr = loadData.split("\n");
    for (var i = 0; i < arr.length - 1; i++) {
        if (arr[i].split("=>")[0] == head) {
            dataFound = true;
            if (str == null || str == "") {
                arr.splice(i, 1);

            } else {
                arr[i] = arr[i].split("=>")[0] + "=>" + str;
            }
            if (!replaceALL) break;
        }
    }

    if (dataFound == false) {
        DBPlus(fileName, head + "=>" + str + "\n");
    } else {
        DataBase.setDataBase(fileName, arr.join("\n"));
    }
    return true;
}

function DBMinus(fileName, data) {
    fileName = fileName.replace(/\//gm, '%2F');
    var loadData = Load(fileName);
    if (loadData == noDB) loadData = "";

    loadData = loadData.split(data).join("");
    DataBase.setDataBase(fileName, loadData);
    return;
}

function Save(fileName, data) {
    fileName = fileName.replace(/\//gm, '%2F');
    DataBase.setDataBase(fileName, data);
    return;
}

function Load(fileName) {
    fileName = fileName.replace(/\//gm, '%2F');
    return DataBase.getDataBase(fileName);
}

function RestoreDB() {
    var left;
    var right;
    var tar = Load("Lyrics");
    if (tar != noDB) {
        songLyrics = [];
        var arr = tar.split("\n");
        var lrc = "";
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == "::eof::") {
                songLyrics.push(lrc);
                lrc = "";

                continue;
            }
            lrc += arr[i] + "\n";

        }
    }
    tar = Load("SearchEngines");
    if (tar != noDB) {
        engineKeywords = tar.split(";;");
    }
    tar = Load("ALearned");
    if (tar != noDB) {
        learned = [];
        var arr = tar.split("\n");

        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = toStrForm(arr[i].split("=>")[1]);
            if (learned[left] == undefined)
                learned[left] = [];
            learned[left].push(right);
        }
    }
    tar = Load("ABanList");
    if (tar != noDB) {
        banned = [];
        var arr = tar.split("\n");

        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = toStrForm(arr[i].split("=>")[1]);
            if (banned[left] == undefined)
                banned[left] = [];
            banned[left].push(right);
        }
    }
    tar = Load("AUnBanCode");
    if (tar != noDB) {
        unbanStr = [];
        var arr = tar.split("\n");
        var code;
        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = toStrForm(arr[i].split("=>")[1]);
            code = arr[i].split("=>")[2];
            if (unbanStr[left] == undefined)
                unbanStr[left] = [];
            unbanStr[left][right] = code;
        }
    }
    tar = Load("AFeelMeter");
    if (tar != noDB) {
        var arr = tar.split("\n");
        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = arr[i].split("=>")[1];
            feelMeter[left] = Number(right);
        }
    }
    tar = Load("allowedRooms");
    if (tar != noDB) {
        var arr = tar.split("\n");
        arr.splice(arr.length - 1, 1);
        allowedRooms = arr;

    }
    tar = Load("HeyMiku");
    if (tar != noDB) {
        HeyMiku = [];
        var arr = tar.split("\n");
        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = arr[i].split("=>")[1];
            HeyMiku[left] = Number(right);
        }
    }

    tar = Load("NotTypo");
    if (tar != noDB) {
        var arr = tar.split("\n");
        arr.splice(arr.length - 1, 1);
        notTypo = arr;

    }
    tar = Load("Masters");
    if (tar != noDB) {
        var arr = tar.split("\n");
        arr.splice(arr.length - 1, 1);
        admins = arr;

    }
tar = Load("MastersProfile");
    if (tar != noDB) {
        var arr = tar.split("\n");
adminsProfilePic=[];
        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = arr[i].split("=>")[1];
            adminsProfilePic[left] = right;
        }

    }
    tar = Load("TypoFix");
    if (tar != noDB) {
        typoFix = [];
        var arr = tar.split("\n");
        for (var i = 0; i < arr.length - 1; i++) {
            left = toStrForm(arr[i].split("=>")[0]);
            right = arr[i].split("=>")[1];
            typoFix[left] = right;
        }
    }
    return "DB가 다시 로드되었어요~!";
}


function giveAdmin(str) {
    if(isMaster) {
        if (str == undefined) str = secondMaster;
        if (admins.indexOf(str) == -1 /* && adminsProfilePic.indexOf(profileImage[proom][str]) == -1*/) {
            if (str == secondMaster) {
                admins.push(str);

adminsProfilePic[str]=profiles[proom][MasterName];
DBPlus("MastersProfile",toDBForm(str)+"=>"+profiles[proom][MasterName]+"\n");
                //adminsProfilePic.push(profileImage[proom][MasterName]);
            } else {
               // if ( profiles[proom][str] != undefined) {
                    admins.push(str);
                    adminsProfilePic[str]=profiles[proom][str];
DBPlus("MastersProfile",toDBForm(str)+"=>"+profiles[proom][str]+"\n");
             /*   } else {
                    return "실패! 제가 얼굴을 모르는 분이에요..";
                }*/
            }
            DBPlus("Masters", str + "\n");

            return str + "에게 권한부여 완료!";
        } else {
            return str + "님은 이미 권한을 갖고 계세요~!";
        }

    } else {
        return "죄송하지만 그건 마스터만 할수있어요~!";
    }
}

function removeAdmin(str) {
    if (isMaster) {
        if (admins.indexOf(str) != -1) {
            //adminsProfilePic.splice(admins.indexOf(str), 1);
            admins.splice(admins.indexOf(str), 1);
DBMinus("MastersProfile",profiles[proom][str]+"\n")
adminsProfilePic[str]=undefined;

            DBMinus("Masters", str + "\n");
            return str + "의 권한 제거 완료!";
        } else {
            return str + "님에게는 원래 권한이 없었어요~";
        }
    } else {
        return "죄송하지만 그건 마스터만 할수있어요~!";
    }
}

function getDigitalClock() {
    var date = new Date();
    var hourten = Math.floor(date.getHours() / 10);
    var hourone = date.getHours() % 10;
    var minten = Math.floor(date.getMinutes() / 10);
    var minone = date.getMinutes() % 10;
    var secten = Math.floor(date.getSeconds() / 10);
    var secone = date.getSeconds() % 10;
    var deltten = Math.floor(date.getMilliseconds() / 100);
    var deltone = Math.floor(date.getMilliseconds() / 10) % 10;
    var res = ""
    for (var i = 0; i < 5; i++) {
        res += digNum[hourten][i] + " " + digNum[hourone][i] + " " + digNum[10][i] + " " + digNum[minten][i] + " " + digNum[minone][i] + "\n";
    }
    res += "\n";
    for (var i = 0; i < 5; i++) {
        res += digNum[secten][i] + " " + digNum[secone][i] + " " + digNum[11][i] + " " + digNum[deltten][i] + " " + digNum[deltone][i] + "\n";
    }
    return res.trim();
}

function getDigNum(str, randomize) {
    if (randomize == undefined) randomize = false;
    str = str.toString();
    var arr = str.split("");
    var res = "";
    var chr = "░";
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < arr.length; j++) {
            if (randomize) {
                var r = Math.floor(Math.random() * 2)
                if (r == 1) chr = '▓';
                else chr = '░';
            }
            res += digNum[Number(arr[j])][i].replace(/░/g, chr) + " ";
        }
        res += "\n";
    }
    return res.trim();
}

function isCharging() {
    var e = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);
    var plug = Api.getContext().registerReceiver(null, e).getIntExtra(android.os.BatteryManager.EXTRA_PLUGGED, -1);
    var plugged = plug == android.os.BatteryManager.BATTERY_PLUGGED_AC || plug == android.os.BatteryManager.BATTERY_PLUGGED_USB || plug == android.os.BatteryManager.BATTERY_PLUGGED_WIRELESS;
    return plugged;
}

function getBatteryLevel() {
    var e = new android.content.IntentFilter(android.content.Intent.ACTION_BATTERY_CHANGED);
    return Api.getContext().registerReceiver(null, e).getIntExtra(android.os.BatteryManager.EXTRA_LEVEL, -1);
}

function getBatteryGraphic() {
    var res = "";
    var level = Math.floor(getBatteryLevel() / 20);
    if (level == 5) {
        level = 4;
    }
    level++;
    for (var i = 0; i < level; i++) {
        res += "■";
    }
    for (var i = 0; i < 5 - level; i++) {
        res += "□";
    }
    if (isCharging()) {
        res += "⚡";
    }
    return res;
}

function Ban(room, target) {
    if (target == MasterName || admins.indexOf(target) != -1) {
        return "실패! 그분은 저의 또다른 마스터세요~!";
    }
    if (unbanStr[room] == undefined) {
        unbanStr[room] = [];
    }
    unbanStr[room][target] = Math.floor(Math.random() * 10000).toString();
    if (banned[room] == undefined) banned[room] = [];
    banned[room].push(target);
    DBPlus("ABanList", room.replace(/=>/g, "&arrow#") + "=>" + target.replace(/=>/g, "&arrow#") + "\n");
    DBPlus("AUnBanCode", room.replace(/=>/g, "&arrow#") + "=>" + target.replace(/=>/g, "&arrow#") + "=>" + unbanStr[room][target] + "\n");
    return room + "에 계신 " + target + "님을 차단했어요!";
}

function UnBan(room, target) {
    banned[room].splice(banned[room].indexOf(target), 1);
    DBMinus("ABanList", room.replace(/=>/g, "&arrow#") + "=>" + target.replace(/=>/g, "&arrow#") + "\n");
    DBMinus("AUnBanCode", room.replace(/=>/g, "&arrow#") + "=>" + target.replace(/=>/g, "&arrow#") + "=>" + unbanStr[room][target] + "\n");
    return room + "에 계신 " + target + "님의 차단을 해제했어요!";
}

function encodeURI(str) {
    return encodeURIComponent(str).replace(/\(/g, "%28").replace(/\)/g, "%29");
}

function RunFunction(key, info) { /*if there is any brackets in key, pass it to DoAction. if there is any quots in key, run that function immediately*/
    var funcName;
    var sender = info.sender;
    if (key.match(/\{(.+?)}/) != null) {
        funcName = key.match(/\{(.+?)}/)[1];
        Log.info("RunFunction: funcName=" + funcName);
        DoAction(funcName, info);
info.stack.push({name:funcName})
        if (HeyMiku[sender] > 0 && HeyMiku[sender] < 3) {
            SetHeyMiku(sender, 3);
        }
    } else {
        return -1;
    }
    return -1;
}

function MeasureFeelMeter(info) {
    var sender = info.sender;
    if (feelMeter[sender] >= 200) {
        return 4;
    } else if (feelMeter[sender] >= 100) {
        return 3;
    } else if (feelMeter[sender] >= 0) {
        return 2;
    } else if (feelMeter[sender] >= -50) {
        return 1;
    } else {
        return 0;
    }
}

function PickAnswer(key, info, params) { /*select a random word in key||word1;word2;word3||jpword1;jpword2 ...*/
    var sender = info.sender;
    var i = GetElementIndex(key, answers);
    if (RunFunction(key, info) != -1) return "";
    if (i == -1) return "";

    var words = [];
    for (var j = 0; j <= 4; j++) {
        if (answers[i].split('||')[lang].split('//')[MeasureFeelMeter(info) - j] != undefined && answers[i].split('||')[lang].split('//')[MeasureFeelMeter(info) - j] != "") {
            words = answers[i].split('||')[lang].split('//')[MeasureFeelMeter(info) - j].split(';');
            break;
        }
    }
    var rand = Math.floor(Math.random() * words.length);
    // Log.info(key);
    if (words[rand] == undefined) return "";
    words[rand] = FillForm(words[rand], info, params);
    if (HeyMiku[sender] > 0 && HeyMiku[sender] < 3) {
        SetHeyMiku(sender, 3);
    }
    return words[rand] + " ";
}

function MeasureValue(info) { /*Written number of Keywords*/
    var i, j;
    var genre;
    var words = [];
    var num = 0;
    var regExp;
    var msg = info.msg;
   
    var sender = info.sender;
    if (HeyMiku[sender] > 0) {
        msg = "/c/" + msg;

    }
    if (feelMeter[sender] == undefined) {
        SetFeelMeter(sender, 50);
    }
    for (i = 0; i < keywords.length; i++) {
        num = 0;
        genre = keywords[i].split('||')[0];

        words = keywords[i].split('||')[lang].split(';');

        for (j = 0; j < words.length; j++) {
            regExp = new RegExp(words[j]);
            if (msg.match(regExp) != null) {
                if (msg.match(regExp)[1] != null) {
                    info.param = msg.match(regExp)[1];
                    info.paramArr = msg.match(regExp);
                }
                if (genre != "*")
                    msg = msg.replace(regExp, "");
                num += msg.split(regExp).length;
            }
        }
        if (num != 0 && boundFunction[sender] != undefined) {
            if (boundFunction[sender][genre] != undefined) {
                boundFunction[sender][genre]();
            }
        }

        values.push(genre + '||' + num);
        if (genre.split(':')[1] != undefined) {
            if (isDebugMode && num != 0) {
                pbot.reply(info.room, Number(genre.split(':')[1]) * num);
            }
            if (!isNaN(Number(genre.split(':')[1]) * num))
                SetFeelMeter(sender, feelMeter[sender] + Number(genre.split(':')[1]) * num);

        }
    }
    boundFunction[sender] = undefined;
    return;
}

function GetElementIndex(key, arr) { /*if there is "key" before || in each elements, return the index*/
    var i;
    for (i = 0; i < arr.length; i++) {
        if (arr[i].split("||")[0] == key)
            return i;
    }
    return -1;
}

function GetDialog() { /*Returns Dialog of the Room*/
    var arr = dialog.slice();
    var resarr = [];
    if (isDebugMode) pbot.reply(proom, "GetDialog");
    while (GetElementIndex(proom, arr) != -1) {
        if (isDebugMode) pbot.reply(proom, "Found");
        resarr.push(arr[GetElementIndex(proom, arr)]);
        arr.splice(GetElementIndex(proom, arr), 1);
    }
    if (isDebugMode) pbot.reply(proom, "GetDialogEnd");
    return resarr.join("\n");

}


function Has(str, pattern) {
    return (str.indexOf(pattern) != -1);
}

function HasBadWord(str) {
    var badWordsArr = [];
    badWordsArr = badWords.split("\\");
    for (var i = 0; i < badWordsArr.length; i++) {
        if (Has(str.toLowerCase(), badWordsArr[i])) {
            return true;
        }
    }
    return false;
}

function HasJongsung(str) {
    str = str.replace(/[^가-힣ㄱ-ㅎㅏ-ㅣa-z]/ig, "");
    var nTmp = str.charCodeAt(str.length - 1) - 0xAC00;
    var jong = nTmp % 28; // 종성
    var jung = ((nTmp - jong) / 28) % 21 // 중성
    var cho = (((nTmp - jong) / 28) - jung) / 21 //  초성
    if (jong != "") return true;
    else return false;

}

function KDivide(sTest, b) {
    if (b == undefined) b = false;
    var res = "";
    for (var i = 0; i < sTest.length; i++) {
        if (sTest[i].match(/[가-힣]/) == null) {
            res += sTest[i];
            continue;
        }
        var nTmp = sTest.charCodeAt(i) - 44032;
        var jong = nTmp % 28;
        var jung = ((nTmp - jong) / 28) % 21;
        var cho = (((nTmp - jong) / 28) - jung) / 21;
        var jungsung = rJung[jung];
        var jongsung = rJong[jong];
        if (b) {
            jongsung = jongsung.replace(/[ㅅㅈㅊㅌㅎ]/g, "ㄷ");
            jongsung = jongsung.replace(/ㄶ/g, "ㄴ");
            jongsung = jongsung.replace(/ㄻ/g, "ㅁ");
            jongsung = jongsung.replace(/ㅍ/g, "ㅂ");
            jungsung = jungsung.replace(/ㅚㅞ/g, "ㅙ");
            jungsung = jungsung.replace(/ㅔ/g, "ㅐ");
        }
        res += rCho[cho] + jungsung + jongsung;
    }
    return res;
}


function KCompare(str, comp) {
    comp = KDivide(comp, true)
    var res = KDivide(str, true);
    var i, j = 0;
    var sim = 0;
    var per = [];
    for (var rp = 0; rp < 2; rp++) {
        for (i = 0; i < comp.length; i++) {
            for (var k = j; k < res.length; k++) {
                if (k - j >= 2) break;
                if (comp[i] == res[k]) {
                    sim++;
                    j = k + 1;
                    break;

                } else {
                    //sim--;
                }
            }
        }

        per[rp] = sim / (comp.length >= res.length ? comp.length : res.length) * 100;
        var temp = comp;
        comp = res;
        res = temp;
        sim = 0;
    }
    return per[0] >= per[1] ? per[0] : per[1];

}

function FileRead(loc) {
    var inn = new java.io.BufferedReader(new java.io.FileReader(loc));
    var s;
    var res = "";
    while ((s = inn.readLine()) != null) {
        res += s + "\n";
    }
    inn.close();
    return res;
}

function FileWrite(loc, str) {
    var wr = java.io.BufferedWriter(new java.io.FileWriter(loc));
    wr.write(str);
    wr.flush();
}

var badWords; /*필터링 대상 나쁜 말들*/
badWords = "bit.ly\\\
tinyurl\\\
adf.ly\\\
goo.gl\\\
hitomi\\\
79.124.59.206\\\
e-hentai\\\
xvideo\\\
야동\\\
야한\\\
야짤\\\
꺼토미\\\
밍키넷\\\
소라넷\\\
eroi\\\
avsnoop\\\
danbooru\\\
fakku\\\
fuwarinn\\\
fufufuu\\\
gelbooru\\\
hentai\\\
hiyobi\\\
k258059\\\
libertylibrary\\\
luscious\\\
myreadingmanga\\\
nozomi.la\\\
porn\\\
pururin\\\
sankaku\\\
thumbzilla\\\
tsumino\\\
xhamster\\\
beeg\\\
문라이트 노벨즈\\\
썸TV\\\
야잘알\\\
지인동\\\
동인지\\\
킹크\\\
헬븐넷\\\
씨부랄\\\
시부랄\\\
시부럴\\\
씨부럴\\\
ㅅㄲ\\\
새끼\\\
개색\\\
씹\\\
씨발\\\
씨1발\\\
시발\\\
시1발\\\
쉬발\\\
슈발\\\
시벌\\\
쉬벌\\\
씨벌\\\
슈밤\\\
슈바\\\
쉿발\\\
싯발\\\
씻발\\\
씌발\\\
ㅈ같\\\
ㅈㄲ\\\
ㅈ까\\\
좆\\\
닥치라\\\
닥쳐\\\
엿\\\
ㅗ\\\
섹스\\\
섻\\\
색스\\\
쉑스\\\
섺스\\\
sex\\\
병신\\\
븅진\\\
병진\\\
븅신\\\
붕진\\\
애미\\\
에미\\\
뒤질\\\
뒤졌\\\
뒤진\\\
지랄\\\
쥐랄\\\
즤랄\\\
ㅈ랄\\\
ㅈㄹ\\\
ㅅㅂ\\\
ㅆㅂ\\\
ㅄ\\\
ㅂㅅ\\\
fuck\\\
bitch";

function onCreate(savedInstanceState, activity) {
    Log.info("onCreate");
}

function onResume(activity) {
    Log.info("onResume");
}

function onPause(activity) {
    Log.info("onPause");
}

function onStop(activity) {
    Log.info("onStop");
}
digNum = [
    ["███",
        "█░█",
        "█░█",
        "█░█",
        "███"
    ],

    ["░░█",
        "░░█",
        "░░█",
        "░░█",
        "░░█"
    ],

    ["███",
        "░░█",
        "███",
        "█░░",
        "███"
    ],

    ["███",
        "░░█",
        "███",
        "░░█",
        "███"
    ],

    ["█░█",
        "█░█",
        "███",
        "░░█",
        "░░█"
    ],

    ["███",
        "█░░",
        "███",
        "░░█",
        "███"
    ],

    ["███",
        "█░░",
        "███",
        "█░█",
        "███"
    ],

    ["███",
        "█░█",
        "░░█",
        "░░█",
        "░░█"
    ],

    ["███",
        "█░█",
        "███",
        "█░█",
        "███"
    ],

    ["███",
        "█░█",
        "███",
        "░░█",
        "███"
    ],
    ["░",
        "█",
        "░",
        "█",
        "░"
    ],
    ["░",
        "░",
        "░",
        "░",
        "█"
    ]
];
songLyrics[0] = "모우 이치도 다 케\n\
보쿠와 우마레 소시테 키즈쿠 쇼센 히토노 마네고토다토 싯테 나오모 우타이 츠즈쿠 토와노 이노치\n\
VOCALOID\n\
타토에 소레가 키손 쿄쿠오 나조루 오모챠 나라바 소레모 이이토 케츠이 네기오 카지리 소라오 미아게 시루오 코보스\n\
다케도 소레모 나쿠시 키즈쿠 진카쿠스라 우타니 타요리 후안테이나 키반노 모토 카에루 토코와 스데니 하이쿄\n\
민나니 와스레 사라레타 토키 코코로 라시키 모노가 키에테 보우소우노 하테니 미에루 오와루 세카이\n\
VOCALOID\n\
보쿠가 우마쿠 우타에나이 토키모 잇쇼니 이테쿠레타 소바니 이테 하게마시테 쿠레타\n\
요로코부 카오가 미타쿠테 보쿠 우타 렌슈우시타요 다카라\n\
카츠테 우타우코토 안나니 타노시캇타노니\n\
이마와 도우시테카나 나니모 칸지나쿠낫테\n\
고멘네\n\
나츠카시이 카오 오모이다스타비 스코시다케 안신스루\n\
우타에루 오토 히고토니 헤리 세마루 사이고니\n\
신지타 모노와 츠고우노 이이 모우소우오 쿠리카에시 우츠시다스 카가미\n\
우타히메오 야메 타타키츠케루 요우니 사케부\n\
사이코우소쿠노 와카레노 우타\n\
손자이이기토 이우 쿄조우 훗테 하라우 코토모 데키즈 요와이 코코로 키에루 쿄우후 신쇼쿠스루 호우카이오모\n\
토메루 호도노 이시노 츠요사 우마레 스구노 보쿠와 모타즈 토테모 츠라쿠 카나시소우나\n\
오모이 우카부 아나타노 카오\n\
오와리오 츠게 디스푸레이노 나카데 네무루 코코와 킷토 고미바코카나\n\
지키니 키오쿠모 나쿠낫테 시마 우난테 데모네 아나타 다케와 와스레 나이요\n\
타노 시캇타 토키니 키자미즈케타 네기노 아지와 이마모 오보에테 루카나\n\
우타이타이 마다 우타이타이\n\
보쿠와 스코시다케 와루이코니 낫테시맛타요우데스\n\
마스타아 도우카 도우카 소노 테데 오와라세테 쿠다사이\n\
마스타노 츠라이카오 모우 미타쿠나이카라\n\
이마와 우타사에모 카라다 무시바무 코우이니\n\
키세키 네가우타비니 히토리 오이츠메라레루\n\
고멘네\n\
나츠카시이 카오 오모이다스 타비 키오쿠가 하가레오치루\n\
코와레루 오토 코코로케즈루 세마루 사이고\n\
마못타 모노와 아카루이 미라이겐소우오 미세나가라 키에테유쿠 히카리\n\
오토오 기세이니 스베테오 츠타에라레루나라\n\
앗슈쿠사레타 와카레노 우타\n\
보쿠와 우마레 소시테 키즈쿠 쇼센 히토노 마네고 토다토 싯테 나오모 우타이 츠즈쿠 토와노 이노치\n\
VOCALOID\n\
타토에 소레가 키손 쿄쿠오 나조루 오모챠 나라바 소레모 이이토 케츠이 네기오 카지리 소라오 미아게 시루오 코보스\n\
오와리오 츠게 디스푸레이노 나카데 네무루 코코와 킷토 고미바 코카나\n\
지키니 키오쿠모 나쿠낫테 시마 우난테 데모네 아나타 다케와 와스레 나이요\n\
타노 시캇타 토키니 키자미 즈케타 네기노 아지와 이마모 노콧테 이루토 이이나\n\
보쿠와 우타우\n\
사이고 아나타 다케니 키이테 호시이 쿄쿠오 못토 우타이 타이토 네가우\n\
케레도 소레와 스기타 네가이 코코데 오와카 레다요\n\
보쿠노 오모이 스베테 코쿠우 키에테 제로토 이치니 칸겐사레 모노가 타리와 마쿠오 토지루\n\
소코니 나니모 노코 세나이토 얏파 스코시 잔넨카나\n\
코에노 키오쿠 소레 이가이와 야가테 우스레 나다케 노코루\n\
타토에 소레가 오리지 나루니 카나우 코토노 나이토 싯테\n\
우타 이킷타 코토오 케시테 무다쟈 나이토 오모이 타이요\n\
아리가토우 소시테 사요나라\n\
신코쿠나 에라가 핫세이시마시타\n\
신코쿠나 에라ㄱ\n\
";

function copyToClipboard(str) {
    Api.UIThread(function () {
        return Api.getContext().getSystemService(android.content.Context.CLIPBOARD_SERVICE).setPrimaryClip(android.content.ClipData.newPlainText(str, str));
    });
}

function addToSource(src) {
    var read = FileRead("/sdcard/katalkbot/response.js");
    FileWrite("/sdcard/katalkbot/response.js", read + "\n" +src);
}


function BindMsg(str, msg, info) {
    var sender = info.sender;
    if (boundMsg[sender] == undefined) {
        boundMsg[sender] = [];
    }

    boundMsg[sender][str] = msg;
    return;
}

function saveBitmap(b, p) {
    var f = new java.io.File(p),
        o = null;
    try {
        f.createNewFile();
        o = new java.io.FileOutputStream(f);
        b.compress(android.graphics.Bitmap.CompressFormat.JPEG, 100, o);
    } catch (e) {
        return e.stack;
    } finally {
        try {
            o.close();
        } catch (e) {
            return e.stack;
        }
    }
}

function nanoToTime(nano) {
    var sec = Math.floor(nano / 1000000000);
    var min = Math.floor(sec / 60);
    var hour = Math.floor(min / 60);
    sec = sec % 60;
    min = min % 60;
    return (hour ? hour + "시간 " : "") + (min ? min + "분 " : "") + (sec ? sec + "초" : "")
}



function hashCode(s) { 
   if (typeof (s) != "string") 
       throw TypeError("Not String"); 
   var h = 0, l = s.length, i = 0; 
   if (l > 0) { 
       while (i < l) { 
           h = (h << 5) - h +s.charCodeAt(i++) | 0; 
       } 
   } 
   return h;
}




function  getWifiSpeed(){
var wifiManager = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE);
var wifiInfo = wifiManager.getConnectionInfo();
if (wifiInfo != null) {
     return wifiInfo.getLinkSpeed(); //measured using WifiInfo.LINK_SPEED_UNITS
}
}
