import { NgModule } from '@angular/core';
import { FirenasePhoneNumberCheckComponent } from './firenase-phone-number-check/firenase-phone-number-check';
import { SelectCountriesCodeComponent } from './select-countries-code/select-countries-code';
import { MoreOptionsComponent } from './more-options/more-options';
@NgModule({
	declarations: [FirenasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent],
	imports: [],
	exports: [FirenasePhoneNumberCheckComponent,
    SelectCountriesCodeComponent,
    MoreOptionsComponent]
})
export class ComponentsModule {}
