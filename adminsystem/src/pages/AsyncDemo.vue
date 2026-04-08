<template>
   <div class="container">
        <header>
            <h1>Vue异步操作控制面板</h1>
            <p class="subtitle">Vue 3响应式系统 + Composition API实现</p>
            <div style="margin-top: 15px;">
                <span :class="['status-indicator', systemStatus.active ? 'status-active' : 'status-inactive']"></span>
                <span>系统状态: {{ systemStatus.text }}</span>
            </div>
        </header>
        
        <div class="dashboard">
            <!-- 卡片1: 定时器异步操作 -->
            <div class="card">
                <h2><i class="fas fa-clock"></i> 定时器操作</h2>
                <div :class="['data-display', timer.statusClass]">{{ timer.displayValue }}</div>
                <div class="progress-bar">
                      <div class="progress-fill" :style="{ width: timer.progress + '%' }"></div>
                </div>
                <p>使用setInterval实现的计数器，每秒更新页面</p>
                <div class="controls">
                    <button class="primary-btn" @click="startTimer" :disabled="timer.isActive">
                        <i class="fas fa-play"></i> {{ timer.isActive ? '运行中' : '启动定时器' }}
                    </button>
                    <button class="danger-btn" @click="stopTimer" :disabled="!timer.isActive">
                        <i class="fas fa-stop"></i> 停止定时器
                    </button>
                </div>
            </div>
            
            <!-- 卡片2: Promise异步操作 -->
            <div class="card">
                <h2><i class="fas fa-code-branch"></i> Promise操作</h2>
                <div :class="['data-display', promise.statusClass]">{{ promise.displayValue }}</div>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: promise.progress + '%' }"></div>
                </div>
                <p>Vue响应式数据与Promise结合</p>
                <div class="controls">
                    <button class="primary-btn" @click="startPromiseTask" :disabled="promise.isLoading">
                        <i class="fas fa-rocket"></i> {{ promise.isLoading ? '执行中...' : '执行Promise任务' }}
                    </button>
                    <button class="danger-btn" @click="cancelPromiseTask" :disabled="!promise.isLoading">
                        <i class="fas fa-ban"></i> 取消任务
                    </button>
                </div>
            </div>
            
            <!-- 卡片3: async/await异步操作 -->
            <div class="card">
                <h2><i class="fas fa-sync-alt"></i> async/await操作</h2>
                <div :class="['data-display', asyncTask.statusClass]">{{ asyncTask.displayValue }}</div>
                <div class="progress-bar">
                    <div class="progress-fill" :style="{ width: asyncTask.progress + '%' }"></div>
                </div>
                <p>使用Vue的Composition API处理异步</p>
                <div class="controls">
                    <button class="primary-btn" @click="startAsyncTask" :disabled="asyncTask.isLoading">
                        <i class="fas fa-play-circle"></i> {{ asyncTask.isLoading ? '执行中...' : '执行异步任务' }}
                    </button>
                    <button class="danger-btn" @click="startParallelTasks" :disabled="asyncTask.isLoading">
                        <i class="fas fa-layer-group"></i> 并行任务
                    </button>
                </div>
            </div>
            
            <!-- 卡片4: Fetch API数据获取 -->
            <div class="card">
                <h2><i class="fas fa-cloud-download-alt"></i> 数据获取</h2>
                <div class="data-display" id="fetchDisplay">点击获取数据</div>
                <div class="progress-bar">
                    <div class="progress-fill" id="fetchProgress"></div>
                </div>
                <p>使用Fetch API从公共API获取数据</p>
                <div class="controls">
                    <button class="primary-btn" id="fetchData">
                        <i class="fas fa-database"></i> 获取用户数据
                    </button>
                    <button class="danger-btn" id="fetchMultiple">
                        <i class="fas fa-server"></i> 批量获取
                    </button>
                </div>
            </div>
        </div>
        
        <div class="log-container">
            <div class="log-header">
                <h3><i class="fas fa-history"></i> 操作日志</h3>
                <button class="secondary-btn" id="clearLogs">
                    <i class="fas fa-trash"></i> 清除日志
                </button>
            </div>
            <ul class="log-list" id="logList">
                <!-- 日志将通过JavaScript动态添加 -->
            </ul>
        </div>
        
        <footer>
            <p>本Demo演示了JavaScript的异步编程模式：定时器、Promise、async/await和Fetch API</p>
            <p>所有数据更新都是异步的，不会阻塞UI线程，实现流畅的页面刷新体验</p>
        </footer>
    </div>     
</template>

<script>
export default {
    data () {
        return {
        tagsList: [],
        collapse: false,
        activeTaskCount: 0,
        timer : {
                count: 0,
                isActive: false,
                timerId: null,
                progress: 0,
                displayValue: '0',
                statusClass: ''
            },
                    
            // 2. Promise任务状态
            promise : {
                isLoading: false,
                isCanceled: false,
                progress: 0,
                displayValue: '等待中...',
                statusClass: ''
            },
            
            // 3. Async任务状态
            asyncTask : {
                isLoading: false,
                progress: 0,
                displayValue: '准备就绪',
                statusClass: ''
            },
            
            // 4. 数据获取状态
            fetchData : {
                isLoading: false,
                progress: 0,
                displayValue: '点击获取数据',
                statusClass: ''
            },
            
            // 5. 系统状态
            systemStatus : {
                active: false,
                text: '空闲'
            },
            
            // 6. 日志
            logs : [],
        }
    },
    components: {

    },
    computed: {
        activeTaskCount() {
            return [
                timer.isActive,
                promise.isLoading && !promise.isCanceled,
                asyncTask.isLoading,
                fetchData.isLoading
            ].filter(Boolean).length;
        }
    },
    watch: {
        activeTaskCount(newCount) {
            this.updateSystemStatus();
        }
    },
    methods: {
        updateSystemStatus() {
            const count = activeTaskCount.value;
            if (count > 2) {
                systemStatus.active = true;
                systemStatus.text = '高负载运行';
            } else if (count > 0) {
                systemStatus.active = true;
                systemStatus.text = '正常运行';
            } else {
                systemStatus.active = false;
                systemStatus.text = '空闲';
            }
        },
        // 1. 定时器相关方法
        startTimer() {
            if (this.timer.isActive) return;
            this.timer.isActive = true;
            this.timer.statusClass = 'success';
            this.timer.timerId = setInterval(() => {
                // Vue会自动检测到这些变化并更新DOM
                this.timer.count++;
                this.timer.displayValue = this.timer.count.toString();
                this.timer.progress = (this.timer.count % 100);
                this.updateSystemStatus();
            }, 1000);
        },
        stopTimer() {
            if (!this.timer.isActive) return;
            clearInterval(this.timer.timerId);
            this.timer.isActive = false;
            this.timer.statusClass = '';
            this.updateSystemStatus();
        },
        // 2. Promise相关方法
        startPromiseTask() {
            if (this.promise.isLoading) return;
            this.promise.isLoading = true;
            this.promise.isCanceled = false;
            this.promise.statusClass = 'loading';
            this.promise.displayValue = '开始执行...';
            new Promise((resolve, reject) => {
                let progress = 0;
                const intervalId = setInterval(() => {
                    if (this.promise.isCanceled) {
                        clearInterval(intervalId);
                        reject('任务已取消');
                        return;
                    }
                    progress += 10;
                    this.promise.progress = progress;
                    this.promise.displayValue = `进度: ${progress}%`;
                    if (progress >= 100) {
                        clearInterval(intervalId);
                        resolve('任务完成');
                    }
                }, 300);
            }).then(message => {
                this.promise.displayValue = message;
                this.promise.statusClass = 'success';
                this.promise.isLoading = false;
                // addLog('Promise任务执行成功', 'success');
            }).then(nextStep => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        resolve(`${nextStep}: 数据处理完成`);
                    }, 500);
                });
            }).then(finalResult => {
                this.promise.displayValue = finalResult;
                // addLog('Promise链式调用完成', 'success');
            }).catch(error => {
                this.promise.displayValue = error;
                this.promise.statusClass = 'error';
            }).finally(() => {
                this.promise.isLoading = false;
                this.updateSystemStatus();
            });
        },
        cancelPromiseTask() {
            if (!this.promise.isLoading) return;
            this.promise.isCanceled = true;     
        },
        startAsyncTask() {
            // if (this.asyncTask.isLoading) return;
            // this.asyncTask.isLoading = true;
            // this.asyncTask.statusClass = 'loading';
            // this.asyncTask.displayValue = '开始执行异步任务...';
            // this.executeAsyncOperation().then(result => {
            //     this.asyncTask.displayValue = result;
            //     this.asyncTask.statusClass = 'success';
            // }).catch(error => {
            //     this.asyncTask.displayValue = error;
            //     this.asyncTask.statusClass = 'error';
            // }).finally(() => {
            //     this.asyncTask.isLoading = false;
            //     this.updateSystemStatus();
            // });
        },
        startParallelTasks() {
            // if (this.asyncTask.isLoading) return;
            // this.asyncTask.isLoading = true;
            // this.asyncTask.statusClass = 'loading';
            // this.asyncTask.displayValue = '开始并行任务...';
            // const tasks = [1, 2, 3, 4, 5].map(i => this.executeAsyncOperation(i * 500));
            // Promise.all(tasks).then(results => {
            //     this.asyncTask.displayValue = `所有任务完成: ${results.join(', ')}`;
            //     this.asyncTask.statusClass = 'success';
            // }).catch(error => {
            //     this.asyncTask.displayValue = error;
            //     this.asyncTask.statusClass = 'error';
            // }).finally(() => {
            //     this.asyncTask.isLoading = false;
            //     this.updateSystemStatus();
            // });
        }
    }
}

</script>

<style>
        
header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    backdrop-filter: blur(10px);
}

h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    background: linear-gradient(45deg, #42b883, #35495e);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.subtitle {
    color: #a9b7c6;
    font-size: 1.2rem;
}

.dashboard {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-bottom: 30px;
}

.card {
    background: rgba(255, 255, 255, 0.08);
    border-radius: 15px;
    padding: 25px;
    transition: all 0.3s;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.card h2 {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #42b883;
}

.card h2 i {
    font-size: 1.8rem;
}

.data-display {
    font-size: 3.5rem;
    font-weight: bold;
    text-align: center;
    margin: 20px 0;
    min-height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;
}

.status-loading {
    color: #ffb74d;
}

.status-success {
    color: #4caf50;
}

.status-error {
    color: #f44336;
}

.progress-bar {
    height: 8px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #42b883, #35495e);
    border-radius: 4px;
    transition: width 0.3s;
}

.controls {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 20px;
}

button {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
    flex: 1;
    min-width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
}

button i {
    font-size: 1.2rem;
}

.primary-btn {
    background: linear-gradient(45deg, #42b883, #35495e);
    color: white;
}

.primary-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(66, 184, 131, 0.4);
}

.secondary-btn {
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.secondary-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

.danger-btn {
    background: linear-gradient(45deg, #f44336, #ff9800);
    color: white;
}

.danger-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(244, 67, 54, 0.4);
}

.log-container {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    padding: 20px;
    margin-top: 20px;
    max-height: 300px;
    overflow-y: auto;
}

.log-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.log-list {
    list-style: none;
}

.log-item {
    padding: 10px 15px;
    margin-bottom: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 4px solid #42b883;
    animation: fadeIn 0.5s;
}

.log-item.log-error {
    border-left-color: #f44336;
}

.log-item.log-success {
    border-left-color: #4caf50;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}

.timestamp {
    font-size: 0.8rem;
    color: #a9b7c6;
    margin-right: 10px;
}

.status-indicator {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 10px;
}

.status-active {
    background-color: #4caf50;
    box-shadow: 0 0 10px #4caf50;
    animation: pulse 2s infinite;
}

.status-inactive {
    background-color: #f44336;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

footer {
    text-align: center;
    margin-top: 40px;
    padding: 20px;
    color: #a9b7c6;
    font-size: 0.9rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

@media (max-width: 768px) {
    .dashboard {
        grid-template-columns: 1fr;
    }
    
    .controls {
        flex-direction: column;
    }
    
    button {
        width: 100%;
    }
}

/* Vue过渡动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
    </style>