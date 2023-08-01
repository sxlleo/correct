import { fabric } from 'fabric';
import type { ToolParamConfig } from '../interface/IAction';
declare class CanvasWithImage extends fabric.Canvas {
    /**
     * 背景图片
     */
    private _bgImageUrl;
    /**
     * canvas的父节点
     */
    private _container;
    /**
     * 加载完成的图片
     */
    private _loadedBgImage;
    /**
     * canvas原始宽高
     */
    private _canvasOriginalWidth;
    private _canvasOriginalHeight;
    /**
     * 父容器原始的宽高
     */
    private _originalContainerWidth;
    private _originalContainerHeight;
    /**
     * 父容器当前的宽高
     */
    private _currentContainerWidth;
    private _currentContainerHeight;
    /**
     * 最小缩放比例
     */
    minZoomValue: number;
    /**
     * 背景图片尺寸
     */
    _bgImageRotate: number;
    /**
     * 是否水平翻转 默认false 不翻转
     */
    _filpX: boolean;
    /**
     * 是否垂直翻转 默认false 不翻转
     */
    _filpY: boolean;
    /**
     * 批改工具id
     */
    _correctId: string;
    /**
     * 全屏
     */
    _isFullscreen: boolean;
    private _resizeObserver;
    constructor(canvasEle: HTMLCanvasElement, options: any, correctId: string, config: ToolParamConfig);
    _initialize(): Promise<any>;
    /**
     * 创建loading元素
     * @returns img元素
     */
    _createLoadingEle(): HTMLElement;
    /**
     * 初始化canvas原始尺寸
     */
    _initializeOriginalCanvasSize(): void;
    /**
     * 容器原始尺寸更新
     * @param width 容器宽度
     * @param height 容器高度
     */
    _onContainerResize(width: number, height: number): void;
    /**
     * 更新背景图片角度
     * @param rotate 角度
     */
    updateBackgroundImageRotate(rotate?: number): Promise<any>;
    /**
     * 镜像图片 使用fabric的flipX: true属性
     * @param
     */
    updateBackgroundImageFlip(): Promise<any>;
    /**
     * 更新背景图片地址
     * @param imageUrl 图片地址
     */
    updateBackgroundImage(imageUrl: string): Promise<any>;
    /**
     * 根据图片原始尺寸，1:更新canvas大小；2:更新背景图片大小
     * @param param 设置图片的参数
     */
    _update(): void;
    /**
     * 计算图片尺寸
     * @returns 图片尺寸和图片是否翻转
     */
    _calculateImageSizeByRotate(): any;
    /**
     * 计算canvas尺寸
     * @param rate 图片宽高比
     * @param containerWidth 图片宽高比
     * @param containerHeight 图片宽高比
     * @returns
     */
    _calculateCanvasSizeByImageRate(rate: number, containerWidth?: number, containerHeight?: number): any;
    /**
     * 生成最后的批改图片
     * @returns
     */
    generateImage(): File;
    setZoom(value: number): this;
    resetFilpRotate(): void;
    destroy(): void;
    /**
     * 获取背景图片
     */
    get bgImageUrl(): string;
    get canvasOriginalWidth(): number;
    get canvasOriginalHeight(): number;
    get originalContainerWidth(): number;
    get originalContainerHeight(): number;
    set isFullscreen(value: boolean);
    get isFullscreen(): boolean;
}
export default CanvasWithImage;
