#import "WidgetBridge.h"
#import <React/RCTLog.h>

#if __has_include(<WidgetKit/WidgetKit.h>)
#import <WidgetKit/WidgetKit.h>
#endif

@implementation WidgetBridge

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(updateWidgetData:(NSString *)payload
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
  @try {
    NSUserDefaults *sharedDefaults = [[NSUserDefaults alloc] initWithSuiteName:@"group.com.autolabs.widget"];
    if (!sharedDefaults) {
      reject(@"WIDGET_UPDATE_FAILED", @"App Group not configured", nil);
      return;
    }

    [sharedDefaults setObject:payload forKey:@"widget_data"];
    [sharedDefaults synchronize];

#if __has_include(<WidgetKit/WidgetKit.h>)
    if (@available(iOS 14.0, *)) {
      [[WidgetCenter sharedInstance] reloadAllTimelines];
    }
#endif

    resolve(@(YES));
  }
  @catch (NSException *exception) {
    reject(@"WIDGET_UPDATE_FAILED", exception.reason, nil);
  }
}

@end
