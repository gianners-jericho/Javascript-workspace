//base controller class for the mvc framework
export class Controller {
    //enables or disables profiler for the current response
    static enableProfiler(res, enable = true) {
        if (res && typeof res.enableProfiler === 'function') {
            res.enableProfiler(enable);
        }
    }
}

export default Controller;
