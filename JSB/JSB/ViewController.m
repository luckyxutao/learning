//
//  ViewController.m
//  JSB
//
//  Created by QITMAC000321 on 2017/10/29.
//  Copyright © 2017年 QITMAC000321. All rights reserved.
//

#import "ViewController.h"
@interface ViewController ()
@property WebViewJavascriptBridge* bridge;

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
}

- (void)viewDidAppear:(BOOL)animated{
    if(_bridge){
        return;
    }
    UIWebView* webView = [[UIWebView alloc] initWithFrame:self.view.bounds];
    [self.view addSubview:webView];
    [WebViewJavascriptBridge enableLogging];
    _bridge = [WebViewJavascriptBridge bridgeForWebView:webView];
    [_bridge setWebViewDelegate:self];
    [_bridge registerHandler:@"testObjcCallback" handler:^(id data, WVJBResponseCallback responseCallback) {
        NSLog(@"testObjcCallback called: %@", data);
        responseCallback(@"Response from testObjcCallback");
    }];
    
    [_bridge callHandler:@"testJavascriptHandler" data:@{ @"foo":@"before ready" }];
    
    
    
    [self renderButtons:webView];
    [self loadExampPage:webView];
}
- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(void)webViewDidStartLoad:(UIWebView *)webView{
    NSLog(@"webViewDidStartLoad");
}

-(void)webViewDidFinishLoad:(UIWebView *)webView{
    NSLog(@"webViewDidFinishLoad");
}


-(void)renderButtons:(UIWebView*)webView{
    UIFont *font  = [UIFont fontWithName:@"HelveticaNeue" size:11.0];
    UIButton *callButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [callButton setTitle:@"Call handler" forState:UIControlStateNormal];
    [callButton addTarget:self action:@selector(callHandler:) forControlEvents:UIControlEventTouchUpInside];
    [self.view insertSubview:callButton aboveSubview:webView];
    callButton.frame = CGRectMake(0, 400, 100, 35);
    callButton.titleLabel.font = font;
    
    UIButton *reloadButton = [UIButton buttonWithType:UIButtonTypeRoundedRect];
    [reloadButton setTitle:@"Reload webView" forState:UIControlStateNormal];
    [reloadButton addTarget:self action:@selector(reload) forControlEvents:UIControlEventTouchUpInside];
    [self.view insertSubview:reloadButton aboveSubview:webView];
    reloadButton.frame = CGRectMake(90, 400, 100, 35);
    reloadButton.titleLabel.font = font;
}

- (void)callHandler:(id)sender {
    id data = @{ @"greetingFromObjC": @"Hi there, JS!" };
    [_bridge callHandler:@"testJavascriptHandler" data:data responseCallback:^(id response) {
        NSLog(@"testJavascriptHandler responded: %@", response);
    }];
}


-(void)loadExampPage:(UIWebView *)webView{
    NSURL * url = [NSURL URLWithString:@"http://127.0.0.1:84/travel_hy2/src/html/p3.html"];
    [webView loadRequest:[NSURLRequest requestWithURL:url]];
}

@end
