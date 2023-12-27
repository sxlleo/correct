import { fabric } from 'fabric';
import type { ToolParamConfig } from '@/interface/IAction';
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
     * 图片旋转角度
     */
    private _imgRotate;
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
     * 是否水平翻转 默认false 不翻转
     */
    private _filpX;
    /**
     * 批改工具id
     */
    private _correctId;
    /**
     * 复制的canvas数据
     */
    private _copyCanvasData;
    /**
     * 尺寸调整观察
     */
    private _resizeObserver;
    /**是否禁用 */
    isDisabled: boolean;
    constructor(canvasEle: HTMLCanvasElement, options: any, correctId: string, config: ToolParamConfig);
    private _initialize;
    /**
     * 从复制canvas数据加载canvas
     * @returns
     */
    private _loadCopyCanvasData;
    /**
     * 更新舞台上元素的位置和尺寸
     * @param scale 缩放比例
     */
    private _updateObjectSizeInCanvas;
    /**
     * 创建loading元素
     * @returns img元素
     */
    private _createLoadingEle;
    /**
     * 容器原始尺寸更新
     * @param width 容器宽度
     * @param height 容器高度
     */
    private _onContainerResize;
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
    updateBackgroundImage(imageUrl: string, finishCallback: () => void): Promise<any>;
    /**
     * 根据图片原始尺寸，1:更新canvas大小；2:更新背景图片大小
     * @param param 设置图片的参数
     */
    private _updateBackgroundSize;
    /**
     * 计算图片尺寸
     * @returns 图片尺寸和图片是否翻转
     */
    private _calculateImageSizeByRotate;
    /**
     * 根据图片尺寸，计算canvas尺寸
     * @returns
     */
    private _caculateCanvasSize;
    /**
     * 更新图片尺寸
     */
    private _updateCanvasSize;
    /**
     * 生成最后的批改图片
     * @returns
     */
    generateImage(): File;
    setZoom(value: number): fabric.Canvas;
    zoomToPoint(point: fabric.Point, value: number): fabric.Canvas;
    /**
     * 设置canvas的transform
     * @param viewportTransform
     * @returns
     * @description
     * 参考：
     * https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/setTransform
     * http://fabricjs.com/docs/fabric.js.html#line9423
     */
    setViewportTransform(viewportTransform: number[]): fabric.Canvas;
    /**
     * 校准背景图片位置，防止背景图片超出canvas
     * @param viewportTransform
     * @returns
     */
    private _correctViewportTransform;
    loadFromJSON(json: any, callback?: any, reviver?: () => void): fabric.Canvas;
    destroy(): void;
    /**
     * 获取背景图片
     */
    get bgImageUrl(): string;
}
export default CanvasWithImage;
