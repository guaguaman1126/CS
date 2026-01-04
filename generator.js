let socket;
let isCounting = false;
let remindSeconds = 540;
let remindSeconds2 = 600;
let remindSeconds3 = 660;
let startTimeMs = 0; // 開始計時的時間點（毫秒）

let minutes = "0";
let seconds = "0";
let reminder = "";

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#111');

    socket = io();

    // 當收到遙控器送來的指令，就「從 0 開始計時」
    socket.on('start-counting', () => {
        startTimeMs = millis();
        isCounting = true;
        loop(); // 確保 draw 開始更新
    });

    // 歸零：停止計時，時間與提醒清空，畫面顯示 0:00
    socket.on('reset-timer', () => {
        isCounting = false;
        console.log(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        minutes = "0";
        seconds = "0";
        reminder = "";
    });

    loop()
}

function draw() {
    background('#111');

    if (!isCounting) {
        
        
    } else {

        // 經過的時間（毫秒） = 現在 - 開始時刻
        const elapsedMs = millis() - startTimeMs;

        // 轉成「已經過幾秒」（整數）
        let elapsedSeconds = Math.floor(elapsedMs / 1000);

        minutes = Math.floor(elapsedSeconds / 60);
        seconds = elapsedSeconds % 60;
        

        // 提醒文字：當經過時間 >= 對應秒數就顯示
        reminder = "";

        if (elapsedSeconds >= remindSeconds3) {
            reminder = "霸脫霸脫霸脫霸脫🫠🫠";
        } else if (elapsedSeconds >= remindSeconds2) {
            reminder = "親愛的老師請盡快結束講評🥹🥹";

        } else if (elapsedSeconds >= remindSeconds) {
            reminder = "還有一分鐘!🙏🙏";
        }
    }

    const label = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    fill(255);
    textAlign(CENTER, CENTER);
    textSize(64);
    text(label, width / 2, height / 2);

    if (reminder) {
        textSize(32);
        text(reminder, width / 2, height / 2 + 60);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

